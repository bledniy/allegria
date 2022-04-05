FROM php:5.4-fpm

RUN apt-get update \
#    && apt-get install -y libzip-dev zip \
#    && docker-php-ext-install pdo pdo_mysql exif zip\
#    && curl -sS https://getcomposer.org/installer | php \
#    && mv composer.phar /usr/local/bin/composer \
