import { readdir, readFile, writeFile } from "node:fs/promises";
import { html } from "simple-html-template-tag";

function kebabCaseToWords(str: string) {
  return str.replace(/-/g, " ");
}

async function generate() {
  const bookmarklets = await Promise.all(
    (
      await readdir("dist/bookmarklets")
    )
      .filter((filename) => filename.endsWith(".min.js"))
      .map(async (filename) => ({
        name: kebabCaseToWords(filename.replace(/\.min\.js$/, "")),
        uri:
          "javascript:" +
          (await readFile(`dist/bookmarklets/${filename}`, "utf-8")).trim(),
      }))
  );

  await writeFile(
    "dist/index.html",
    "<!DOCTYPE html>\n" +
      html`
        <html>
          <body>
            <ul>
              ${bookmarklets.map(
                ({ name, uri }) => html`
                  <li>
                    <a href="${uri}">${name}</a>
                  </li>
                `
              )}
            </ul>
          </body>
        </html>
      `
  );
}

generate();
