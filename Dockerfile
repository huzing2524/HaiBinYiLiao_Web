FROM drg.dasudian.net/library/nginx:1.13.9-alpine
MAINTAINER Builder <builder@dasudian.com>

ENV RUN_ENV="prod"

# COPY docker-entrypoint.sh /entrypoint

RUN set -x \
  && apk add --no-cache su-exec \
  && rm -f /etc/nginx/conf.d/default.conf \
  && mkdir -p /usr/share/nginx/html

COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html

# ENTRYPOINT ["/entrypoint"]
