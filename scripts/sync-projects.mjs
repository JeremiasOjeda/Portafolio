import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

/**
 * Lista declarativa de subproyectos compilados que deben sincronizarse
 * hacia `apps/web/public/projects/` antes de ejecutar `dev` o `build`.
 *
 * Para añadir un nuevo subproyecto estático/compilado en el futuro,
 * basta con agregar una entrada a este arreglo.
 */
const PROJECTS_TO_SYNC = [
  {
    name: "Custom Draw Roulette (Flutter Web)",
    sourceDir: path.join(ROOT_DIR, "projects", "custom-draw-roulette", "build", "web"),
    targetDir: path.join(ROOT_DIR, "apps", "web", "public", "projects", "ruleta"),
    baseHrefFix: "/projects/ruleta/",
  },
];

function syncProjects() {
  console.log("🔄 [sync-projects] Sincronizando subproyectos compilados...");

  for (const project of PROJECTS_TO_SYNC) {
    if (!fs.existsSync(project.sourceDir)) {
      console.warn(
        `⚠️  [sync-projects] No se encontró el directorio origen para "${project.name}":\n   ${project.sourceDir}`
      );
      continue;
    }

    // Limpiar destino previo y recrear carpeta
    fs.rmSync(project.targetDir, { recursive: true, force: true });
    fs.mkdirSync(project.targetDir, { recursive: true });

    // Copiar recursivamente todos los archivos compilados
    fs.cpSync(project.sourceDir, project.targetDir, { recursive: true });

    // Ajustar <base href="/"> en el index.html compilado de Flutter para que funcione bajo /projects/ruleta/
    if (project.baseHrefFix) {
      const indexHtmlPath = path.join(project.targetDir, "index.html");
      if (fs.existsSync(indexHtmlPath)) {
        const htmlContent = fs.readFileSync(indexHtmlPath, "utf8");
        const updatedHtml = htmlContent.replace(
          /<base href="[^"]*">/i,
          `<base href="${project.baseHrefFix}">`
        );
        fs.writeFileSync(indexHtmlPath, updatedHtml, "utf8");
      }
    }

    console.log(`✅ [sync-projects] ${project.name} -> apps/web/public/projects/ruleta`);
  }
}

syncProjects();

