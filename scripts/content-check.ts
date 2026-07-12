import { validateAllContent } from "../src/lib/content/validate";

const result = validateAllContent();

if (!result.ok) {
  console.error("Content validation failed:");
  for (const issue of result.issues) {
    console.error(`- [${issue.collection}] ${issue.message}`);
  }

  if (result.content === null) {
    process.exit(1);
  }

  process.exitCode = 1;
}

const content = result.content;

if (content === null) {
  console.error("Content validation failed before content could be loaded.");
  process.exit(1);
}

console.log("Content validation passed.");
console.log(`- Items: ${content.items.length}`);
console.log(`- Field Notes: ${content.fieldNotes.length}`);
console.log(`- Highlights: ${content.highlights.highlights.length}`);
console.log(`- Skill Groups: ${content.skillGroups.length}`);
console.log(`- Experience Phases: ${content.experiencePhases.length}`);
