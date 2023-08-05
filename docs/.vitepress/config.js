// .vitepress/config.js
export default {
    title: "Tiny Express",
    description: "An awesome docs template built by me",
    themeConfig: {
        cleanUrls: true,
        nav: [
            { text: "Home", link: "/" },
            {
                text: "Getting Started", items: [
                    { text: "Installing", link: "/getting_started/installing" },
                    { text: "Hello World", link: "/getting_started/hello_world" },
                    { text: "Basic Routing", link: "/getting_started/basic_routing" },
                ]
            },
            {
                text: "Guide", items: [
                    { text: "Routing", link: "/guide/routing" },
                    { text: "Writing Middleware", link: "/guide/writing_middleware" },
                    { text: "Using Middleware", link: "/guide/using_middleware" },
                    { text: "Overriding the Tiny Express API", link: "/guide/overriding_the_express_api" },
                    { text: "Error Handling", link: "/guide/error_handling" },
                    { text: "Database Integration", link: "/guide/database_integration" },
                    { text: "Examples", link: "/guide/examples" },
                ]
            },
            {
                text: "API Reference", items: [
                    { text: "1.x", link: "/api_reference/api_reference_1.x" },
                ]
            },
            { text: "Blog", link: "https://robiul.dev/" },
            { text: "Author", link: "https://robiulhr.github.io/" },

        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/robiulhr/tiny-express" },
            { icon: "twitter", link: "https://twitter.com/robiulhr01" },
            { icon: "linkedin", link: "https://linkedin.com/in/robiulhr" },
        ],
        sidebar: {
            "/getting_started": [
                {
                    text: "Getting Started",
                    collapsible: true,
                    items: [
                        { text: "Installing", link: "/getting_started/installing" },
                        { text: "Hello World", link: "/getting_started/hello_world" },
                        { text: "Basic Routing", link: "/getting_started/basic_routing" },
                    ],
                }
            ],
            "/guide/": [
                {
                    text: "Guide",
                    collapsible: true,
                    items: [
                        { text: "Routing", link: "/guide/routing" },
                        { text: "Writing Middleware", link: "/guide/writing_middleware" },
                        { text: "Using Middleware", link: "/guide/using_middleware" },
                        { text: "Overriding the Tiny Express API", link: "/guide/overriding_the_express_api" },
                        { text: "Error Handling", link: "/guide/error_handling" },
                        { text: "Database Integration", link: "/guide/database_integration" },
                        { text: "Examples", link: "/guide/examples" },
                    ],
                }
            ],
            "/api_reference": [
                {
                    text: "API Reference 1.x",
                    collapsible: true,
                    items: [
                        { text: "tinyExpress()", link: "/api_reference/api_reference_1.x.html#tinyExpress" },
                        { text: "Methods", link: "/api_reference/api_reference_1.x.html#methods" },
                    ],
                }
            ]
        },
        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2023-present Robiul H.",
        },
        search: {
            provider: 'local'
        }
    },

};