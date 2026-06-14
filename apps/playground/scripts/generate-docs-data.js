import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to this script
const docsDir = path.resolve(__dirname, "../../../packages/core/src/docs");
const outputFilePath = path.resolve(__dirname, "./docs-data.js");

function main() {
  console.log("Compiling documentation markdown files...");

  const data = {};

  // 1. Load framework integration documentation
  const integrationPath = path.join(docsDir, "framework-integration.md");
  if (fs.existsSync(integrationPath)) {
    data["global-integration"] = fs.readFileSync(integrationPath, "utf8");
    console.log("Loaded framework-integration.md -> global-integration");
  } else {
    console.error("Warning: framework-integration.md not found at:", integrationPath);
  }

  // 2. Load accessibility documentation
  const accessibilityPath = path.join(docsDir, "accessibility.md");
  if (fs.existsSync(accessibilityPath)) {
    data["global-accessibility"] = fs.readFileSync(accessibilityPath, "utf8");
    console.log("Loaded accessibility.md -> global-accessibility");
  } else {
    console.error("Warning: accessibility.md not found at:", accessibilityPath);
  }

  // 3. Load component documentation
  const componentsDir = path.join(docsDir, "components");
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    files.forEach(file => {
      if (file.endsWith(".md") && !file.startsWith(".")) {
        const key = path.basename(file, ".md");
        const filePath = path.join(componentsDir, file);
        data[key] = fs.readFileSync(filePath, "utf8");
        console.log(`Loaded component docs: ${file} -> ${key}`);
      }
    });
  } else {
    console.error("Warning: components directory not found at:", componentsDir);
  }

  // 4. Generate JavaScript content
  let jsContent = "// Auto-generated file. Do not edit directly.\n";
  jsContent += "export const DOCS_DATA = {\n";

  const entries = Object.entries(data);
  entries.forEach(([key, val], idx) => {
    const trailingComma = idx === entries.length - 1 ? "" : ",";
    jsContent += `  ${JSON.stringify(key)}: ${JSON.stringify(val)}${trailingComma}\n`;
  });

  jsContent += "};\n";

  fs.writeFileSync(outputFilePath, jsContent, "utf8");
  console.log("Successfully generated docs-data.js at:", outputFilePath);
}

main();
