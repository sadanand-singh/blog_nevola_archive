module.exports = {
  siteMetadata: {
    title: `Notes on AI in Health Care and Programming`,
    name: `reckoning.dev`,
    siteUrl: `https://reckoning.dev`,
    description: `Sadanand is a scientist, programmer, engineer, and writer who loves explaining complex concepts in simple words to people of all skill levels.`,

    // important to set the main text that appears in the hero
    hero: {
      heading: `Notes on AI, Health Care and Computers!`,
      maxWidth: 1052
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/saddy4s`
      },
      {
        name: `github`,
        url: `https://github.com/sadanand-singh`
      },
      {
        name: `facebook`,
        url: `https://facebook.com/sadanand4singh/`
      }
    ]
  },
  plugins: [
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        authorsPage: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `reckoning.dev by Sadanand`,
        short_name: `Sadanand`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-54080172-1'
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true
            }
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
              delimiters: [
                {
                  left: '\\\\begin{equation*}',
                  right: '\\\\end{equation*}',
                  display: true
                },
                { left: '$$', right: '$$', display: true },
                { left: '\\[', right: '\\]', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false }
              ]
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer' // eslint-disable-line unicorn/prevent-abbreviations
            }
          }
        ],
        remarkPlugins: [require(`remark-slug`)] // eslint-disable-line global-require
      }
    }
  ]
};
