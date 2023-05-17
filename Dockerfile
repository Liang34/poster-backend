# Dockerfile
FROM node:14
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
# 安装
RUN npm set registry https://registry.npm.taobao.org
RUN npm i

# 启动
CMD npm run prd-dev && npx pm2 log 
# npx pm2 log  阻塞控制台的程序
# RUN 构建镜像时，一般用于做一些系统配置，安装必备软件，可能多个RUN
# CMD 启动容器时，只能有一个CMD
# ENV 环境变量
