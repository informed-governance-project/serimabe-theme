FROM alpine:latest
ARG THEME_VERSION=latest

RUN apk add --no-cache git
WORKDIR /app/theme

# COPY ./ /app/theme

RUN git clone --depth=1 --single-branch --branch ${THEME_VERSION} https://github.com/informed-governance-project/default-theme.git .

RUN chown -R 33:33 /app/theme

RUN rm -rf .git .gitignore docker/

USER 33

CMD ["tail", "-f", "/dev/null"]


