#command to build:
#docker build --tag test1:v1.1 .
#make sure to delete from docker desktop before building

FROM node:20.0.0

EXPOSE 80:80

SHELL ["/bin/bash", "-c"]

COPY docker/bashrc /root/.bashrc
#set SSH keys
COPY docker/ssh /root/.ssh/
RUN chmod 600 /root/.ssh/id_ed25519
RUN chmod 644 /root/.ssh/id_ed25519.pub
RUN chmod 644 /root/.ssh/known_hosts

RUN curl -L https://raw.github.com/git/git/master/contrib/completion/git-prompt.sh > ~/.bash_git
COPY ./docker/git/ ./.git/
RUN git config --global user.email "farzadk@gmail.com"
RUN git config --global user.name "Farzad Meow Khalafi"
RUN git config --global core.eol lf
RUN git config --global core.autocrlf false

COPY ../ /root/source_code/js-transaction/

WORKDIR /root/
COPY ./docker/run-at-start.sh ./run-at-start.sh
CMD ["/root/run-at-start.sh"]

