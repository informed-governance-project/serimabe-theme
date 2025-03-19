FROM alpine AS build
FROM scratch

ARG THEME_VERSION=latest
ENV THEME_VERSION=${THEME_VERSION}

WORKDIR /app/theme

COPY --from=build /lib/ld-musl-* /lib/
COPY --from=build /bin/busybox /bin/sleep

COPY --chown=33 ./ /app/theme

USER 33

CMD ["sleep", "infinite"]


