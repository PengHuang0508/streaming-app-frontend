# Mellon

For backend documentation, please visit this [repository](https://github.com/PengHuang0508/streaming-app-backend)

Mellon is a AWS powered online video streaming platform.

- Upload your video
- Backend will do all the processing
- Watch your video wherever!

# Features

- Registered users can upload and edit videos.
- Backend takes care of all the video preparation and transcoding.
- Files are encrypted and stored safely on AWS S3.

### Tech stacks

- [ReactJS](https://reactjs.org/) - JS library
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) - toolchain for setting react environment
- [Redux](https://redux.js.org/) - state management library
- [PHP](https://www.php.net/) - process backend requests
- [MySQL](https://www.mysql.com/) - database
- [Nginx](https://www.nginx.com/) - reverse proxy
- [Node.js](https://nodejs.org/en/) - JS runtime
- [Compoer](https://getcomposer.org/) - PHP dependency manager
- [Material UI](https://material-ui.com/) - React UI framework

### AWS Services

- [AWS S3](https://aws.amazon.com/s3/) - online storage
- [AWS IAM](https://aws.amazon.com/iam/) - access control
- [AWS Elastic Transcoder](https://aws.amazon.com/elastictranscoder/) - transcode files
- [AWS CloudFront](https://aws.amazon.com/cloudfront/) - CDN for streaming HLS
- [AWS Amplify](https://aws.amazon.com/amplify/) - frontend library
- [AWS cognito](https://aws.amazon.com/cognito/) - access control, like sign-in sign-up
- [AWS KMS](https://aws.amazon.com/kms/) - encryption keys
- [AWS EC2](https://aws.amazon.com/ec2/) - host online demo

### Installation

You need to first install Node, Nginx, PHP and MySQL on your machine.

To set up the backend environment, please refering to the following guides:
[How To Install Linux, Nginx, MySQL, PHP (LEMP stack) in Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu-16-04)
[How To Install Linux, Nginx, MySQL, PHP (LEMP stack) on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)

##### Backend settings:

Change the maximum file size allowed in /php/php.ini

```
upload_max_filesize = 25M
post_max_size = 25M
```

Your /nginx.conf should look something like this

```
server {
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;
        client_max_body_size 25M;


        location / {
            root PATH_TO_FRONTEND_BUILD_FOLDER
            index index.html index.htm;

            // Choose the port your frontend will be hosting on
            proxy_pass https://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;

            add_header Access-Control-Allow-Origin *;
        }
        server_name localhost;

        location /api {
            root PATH_TO_BACKEND_FOLDER
            index index.php index.html index.htm;
            try_files $uri  /index.php$is_args$args;

            add_header Access-Control-Allow-Origin *;
        }

        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }

        location ~ \.php$ {
            try_files $uri =404;

            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass    127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
```

### Optional softwares

The following software were used during the development.
| Software | Usage |
| ------ | ------ |
| [VSCode](https://code.visualstudio.com/) | Text editor |
| [Postman](https://www.postman.com/) | Testing APIs |
| [Beekeeper Studio](https://www.beekeeperstudio.io/) | SQL editor |

### Todos

- Write more tests
- Add server trigger/hooks
- Optimize backend by adding containers and implement queuing.
