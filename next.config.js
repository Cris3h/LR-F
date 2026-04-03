/**
 * @type {import('next').NextConfig}
 *
 * En Windows, si la ruta del proyecto tiene espacios, Next puede devolver 404
 * en /_next/static/ (ver issue vercel/next.js#48699). Usá una ruta sin espacios.
 */

module.exports = {
    images: {
        domains: [
            "www.parqueavellanedaweb.com.ar",
            "content.cuerpomente.com",
            "s1.elespanol.com",
            "content.clara.es",
            "lh3.googleusercontent.com",
        ],
    },


};
