import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const baseUrl = process.env.QUARTZ_BASE_URL || "localhost:8080"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Nan 的食谱库",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl,
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Inter",
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#f9f9f9",
          lightgray: "#eeeeee",
          gray: "#7a7a86",
          darkgray: "#1a1a1a",
          dark: "#111111",
          secondary: "#4557f7",
          tertiary: "#6a62ff",
          highlight: "rgba(69, 87, 247, 0.1)",
          textHighlight: "rgba(106, 98, 255, 0.2)",
        },
        darkMode: {
          light: "#0f1117",
          lightgray: "#232632",
          gray: "#9198ab",
          darkgray: "#f3f5fb",
          dark: "#ffffff",
          secondary: "#93a0ff",
          tertiary: "#bbb5ff",
          highlight: "rgba(147, 160, 255, 0.14)",
          textHighlight: "rgba(187, 181, 255, 0.24)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
