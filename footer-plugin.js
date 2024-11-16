window.$docsify.plugins = [].concat(
    function (hook) {
        hook.afterEach(function (html, next) {
            var footer = '<footer style="text-align: center; margin-top: 50px; padding: 10px;">' +
                '<p>© 2024, Bilinçli Linux Tüketicileri - Tüm Hakları Saklıdır. ' +
                '</p>' +
                '<p>' +
                '<a href="https://raw.githubusercontent.com/bilinclilinuxtuketicileri/bilinclilinuxtuketicileri.github.io/refs/heads/main/LICENSE" target="_blank">' +
                '<img src="docs/images/cc0.png" alt="Public Domain" style="width: 150px; vertical-align: middle;">' +
                '</a>' +
                '</p>' +
                '<p>' +
                '<a href="https://github.com/bilinclilinuxtuketicileri/bilinclilinuxtuketicileri.github.io/fork" title="Forks on GitHub" target="_blank">' +
                '<img src="https://img.shields.io/github/forks/bilinclilinuxtuketicileri/bilinclilinuxtuketicileri.github.io" alt="Forks">' +
                '</a> ' +
                '<a href="https://github.com/bilinclilinuxtuketicileri/bilinclilinuxtuketicileri.github.io/stargazers" title="Stars on GitHub" target="_blank">' +
                '<img src="https://img.shields.io/github/stars/bilinclilinuxtuketicileri/bilinclilinuxtuketicileri.github.io" alt="Stars">' +
                '</a>' +
                '</p>' +
                '</footer>';
            html = html + footer;
            next(html);
        });
    },
    window.$docsify.plugins
);