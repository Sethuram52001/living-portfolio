import { z } from "zod";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { buildHomePageData, HomePageDataError } from "./home-page";
import { loadPortfolioContent } from "./loaders";

type ValidationIssue = {
  collection: string;
  message: string;
};

function addIssue(issues: ValidationIssue[], collection: string, message: string) {
  issues.push({ collection, message });
}

function checkUniqueSlugs(
  issues: ValidationIssue[],
  collection: string,
  slugs: string[],
) {
  const seen = new Set<string>();

  for (const slug of slugs) {
    if (seen.has(slug)) {
      addIssue(issues, collection, `Duplicate slug "${slug}".`);
    }
    seen.add(slug);
  }
}

function checkPublicAsset(
  issues: ValidationIssue[],
  collection: string,
  ownerSlug: string,
  assetPath: string | undefined,
) {
  if (!assetPath) {
    addIssue(issues, collection, `${ownerSlug} is missing previewImage.`);
    return;
  }

  if (!assetPath.startsWith("/")) {
    addIssue(
      issues,
      collection,
      `${ownerSlug} previewImage must use a public absolute path.`,
    );
    return;
  }

  const filePath = join(process.cwd(), "public", assetPath.slice(1));

  if (!existsSync(filePath)) {
    addIssue(
      issues,
      collection,
      `${ownerSlug} previewImage points to missing public asset "${assetPath}".`,
    );
  }
}

export function validateAllContent() {
  const issues: ValidationIssue[] = [];

  try {
    const content = loadPortfolioContent();

    checkUniqueSlugs(issues, "items", content.items.map((item) => item.slug));

    try {
      const homePage = buildHomePageData(content);

      for (const { item } of homePage.selectedWork) {
        checkPublicAsset(issues, "items", item.slug, item.previewImage);
      }
    } catch (error) {
      if (error instanceof HomePageDataError) {
        addIssue(issues, "home", error.message);
      } else {
        throw error;
      }
    }

    for (const phase of content.experiencePhases) {
      if (phase.summary.toLowerCase().includes("placeholder")) {
        addIssue(
          issues,
          "experiencePhases",
          `${phase.organization} has placeholder summary text.`,
        );
      }
    }

    return { ok: issues.length === 0, issues, content };
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        addIssue(issues, "schema", `${issue.path.join(".")}: ${issue.message}`);
      }
      return { ok: false, issues, content: null };
    }

    throw error;
  }
}
