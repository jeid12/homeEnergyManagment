FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    sqlite3 \
    libsqlite3-dev \
    nodejs \
    npm

# PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application
COPY . .

# Install backend dependencies
RUN composer install

# Install frontend dependencies
RUN npm install && npm run build

# Create SQLite file if it doesn't exist
RUN touch /var/www/database/database.sqlite

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
