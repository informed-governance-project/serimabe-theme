FROM alpine

ARG THEME_VERSION=latest
ENV THEME_VERSION=${THEME_VERSION}

WORKDIR /app/theme

COPY --chown=33 ./ /app/theme

USER 33

CMD ["tail", "-f", "/dev/null"]


