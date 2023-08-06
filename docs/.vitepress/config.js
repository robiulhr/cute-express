// .vitepress/config.js
export default {
    title: "Cute Express",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    base: "/cute-express/",
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
                    { text: "Overriding the Cute Express API", link: "/guide/overriding_the_express_api" },
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
            { icon: "github", link: "https://github.com/robiulhr/cute-express" },
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
                        { text: "Overriding the Cute Express API", link: "/guide/overriding_the_express_api" },
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
                        {
                            text: "cuteExpress()", collapsible: true, link: "/api_reference/api_reference_1.x.html#cuteexpress", items: [
                                { text: "Methods" },
                                { text: "cuteExpress.json()", collapsible: true, link: "/api_reference/api_reference_1.x.html#cuteexpress-json" },
                                { text: "cuteExpress.raw()", collapsible: true, link: "/api_reference/api_reference_1.x.html#cuteexpress-raw-options" },
                                { text: "cuteExpress.Router()", collapsible: true, link: "/api_reference/api_reference_1.x.html#cuteexpress-router" },
                                { text: "cuteExpress.urlencoded()", collapsible: true, link: "/api_reference/api_reference_1.x.html#cuteexpress-urlencoded" },
                            ]
                        },
                        {
                            text: "Application", collapsible: true, link: "/api_reference/api_reference_1.x.html#application", items: [
                                { text: "Methods" },
                                { text: "app.all()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-all-path-callback-callback" },
                                { text: "app.delete()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-delete-path-callback-callback" },
                                { text: "app.get()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-get-path-callback-callback" },
                                { text: "app.listen()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-listen-port-host-callback" },
                                { text: "app.METHOD()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-method-path-callback-callback" },
                                { text: "app.post()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-post-path-callback-callback" },
                                { text: "app.put()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-put-path-callback-callback" },
                                { text: "app.route()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-route-path" },
                                { text: "app.use()", collapsible: true, link: "/api_reference/api_reference_1.x.html#app-use-path-callback-callback" },
                            ]
                        },
                        {
                            text: "Request", collapsible: true, link: "/api_reference/api_reference_1.x.html#request", items: [
                                { text: "Properties" },
                                { text: "app.body", collapsible: true, link: "/api_reference/api_reference_1.x.html#req-body" },
                            ]
                        },
                        {
                            text: "Response", collapsible: true, link: "/api_reference/api_reference_1.x.html#response", items: [
                                { text: "Methods" },
                                { text: "res.end()", collapsible: true, link: "/api_reference/api_reference_1.x.html#res-end-data" },
                                { text: "res.json()", collapsible: true, link: "/api_reference/api_reference_1.x.html#res-json-body" },
                                { text: "res.redirect()", collapsible: true, link: "/api_reference/api_reference_1.x.html#res-redirect-status-path" },
                                { text: "res.send()", collapsible: true, link: "/api_reference/api_reference_1.x.html#res-send-body" },
                                { text: "res.set()", collapsible: true, link: "/api_reference/api_reference_1.x.html#res-set-field-value" },
                                { text: "res.status()", collapsible: true, link: "/api_reference/api_reference_1.x.html#res-status-code" },
                            ]
                        }, {
                            text: "Router", collapsible: true, link: "/api_reference/api_reference_1.x.html#router", items: [
                                { text: "Methods" },
                                { text: "router.all()", collapsible: true, link: "/api_reference/api_reference_1.x.html#router-all-path-callback-callback" },
                                { text: "router.method()", collapsible: true, link: "/api_reference/api_reference_1.x.html#router-method-path-callback-callback" },
                                { text: "router.route()", collapsible: true, link: "/api_reference/api_reference_1.x.html#router-route-path" },
                                { text: "router.use()", collapsible: true, link: "/api_reference/api_reference_1.x.html#router-use-path-function-function" },
                            ]
                        }
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