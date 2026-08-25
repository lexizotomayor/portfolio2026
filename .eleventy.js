module.exports = function(eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // Filters
  eleventyConfig.addFilter("dateReadable", (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("htmlDateString", (date) => {
    return new Date(date).toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // Relative age label — "today", "4 days ago", "7 months ago".
  // Added for the redesign: the blog index and article stamp lead with this.
  eleventyConfig.addFilter("timeAgo", (date) => {
    const days = Math.max(0, Math.round((Date.now() - new Date(date).getTime()) / 86400000));
    if (days === 0) return "today";
    if (days === 1) return "1 day ago";
    if (days < 30) return days + " days ago";
    const months = Math.round(days / 30);
    if (months < 12) return months === 1 ? "1 month ago" : months + " months ago";
    const years = Math.round(days / 365);
    return years === 1 ? "1 year ago" : years + " years ago";
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
