docker-compose exec fpm composer install
docker-compose exec fpm composer require ext-gd
docker-compose exec fpm php artisan db:create
docker-compose exec fpm php artisan migrate
docker-compose exec fpm php artisan migrate:fresh --seed
docker-compose exec fpm php artisan storage:link
docker-compose exec fpm php artisan key:generate

echo 'Доступы в админку: admin'
echo $(docker-compose exec fpm php artisan pass superadmin)