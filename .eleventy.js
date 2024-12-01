const fs = require("fs-extra");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Evento 'before' para limpar a pasta `_site` antes do build
  eleventyConfig.on("before", async () => {
    const outputDir = path.join(__dirname, "_site");
    if (await fs.pathExists(outputDir)) {
      console.log("Limpando a pasta _site...");
      await fs.emptyDir(outputDir); // Limpa a pasta (remove todo o conteúdo)
    }
  });

  // Copiar assets estáticos para a pasta de saída
  eleventyConfig.addPassthroughCopy("src/assets");

  // Coleção de posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/*.md");
  });

  // Configurações de diretórios
  return {
    dir: {
      input: "src", // Pasta de entrada
      includes: "layouts", // Layouts e includes
      output: "_site", // Pasta de saída
    },
    templateFormats: ["html", "njk", "md"], // Formatos suportados
    markdownTemplateEngine: "njk", // Engine para Markdown
  };
};
