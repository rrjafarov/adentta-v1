import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  locales: ["az", "en", "ru"],
  defaultLocale: "az",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    output: "standalone",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.adentta.az",
        pathname: "/**",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
