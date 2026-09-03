module.exports = function(eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  // Filters
  eleventyConfig.addFilter("dateReadable", (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  });

  eleventyConfig.addFilter("htmlDateString", (date) => {
    return new Date(date).toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("isoDateTime", (date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // Relative age label — "42 seconds ago", "3 hours ago", "2 weeks ago", "7 months ago".
  // This is the build-time fallback rendered into the HTML; src/js/timeago.js
  // mirrors this same bucket logic to keep the label ticking client-side after
  // the page loads, since a static build otherwise freezes it at deploy time.
  eleventyConfig.addFilter("timeAgo", (date) => {
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
    if (seconds < 60) return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours === 1 ? "1 hour ago" : hours + " hours ago";
    const days = Math.floor(hours / 24);
    if (days < 7) return days === 1 ? "1 day ago" : days + " days ago";
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return weeks === 1 ? "1 week ago" : weeks + " weeks ago";
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
