# Mellon

For backend documentation, please visit this [repository](https://github.com/PengHuang0508/streaming-app-backend)

Mellon is an AWS powered online video streaming platform.

- Upload your video
- Backend will do all the processing
- Watch your video wherever!

## Live demo

[Mellon](http://54.173.87.111/) - hosted on AWS EC2

### Features

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
- [Composer](https://getcomposer.org/) - PHP dependency manager
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

**Make sure you have the backend services running first.** Please refer to the [backend repository](https://github.com/PengHuang0508/streaming-app-backend) for instructions on how to setup.

Go to /src/config.sample.json and fill in your own AWS Cognito credentials.

```sh
$ cd streaming-app-frontend
$ npm install
$ npm run
```

### Optional

The following tools were used throughout the development of Mellon.
| Software | Usage |
| ------ | ------ |
| [VSCode](https://code.visualstudio.com/) | Text editor |
| [Postman](https://www.postman.com/) | API client |
| [Beekeeper Studio](https://www.beekeeperstudio.io/) | SQL editor |

### Todos

- Write more tests
- Add server trigger/hooks
- Optimize backend by containerizing and implementing queuing
