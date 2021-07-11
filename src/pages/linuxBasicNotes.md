---
layout:     post
title:      "Linux Basic Notes"
subtitle:   "Be a Stupid Learner"
date:       2017-08-23
author:     "Sabertaz"
header-img: "images/home-bg.jpg"
tags:
    - Computer Science
    - GNU
    - Linux
---

# Linux Basic Notes

## Linux Boot System

### Grub

#### Grub Configuration

- `/etc/default/grub`配置文件, 用于一些基本的修改项,
  如默认启动项, Grub 界面等待时长, Grub 主题 etc.
  More details in `info -f grub -n 'Simple configuration'`

```bash
# Default Startup OS
GRUB_DEFAULT=0

# Default Timeout
GRUB_TIMEOUT=5

# https://github.com/vinceliuice/grub2-themes
GRUB_THEME="/boot/grub/themes/Tela/theme.txt"
```

- `/etc/grub.d/*`生成`/boot/grub/grub.cfg`的执行脚本(`update-grub`命令),
  可以更细致地修改启动项, 如各个启动项的名称、顺序等.

#### Grub Repair

##### Windows Repair

- easyBCD for non-efi loader
- with efi loader, run command:

```bash
# root commander
bcdedit /set "{bootmgr}" path \EFI\ubuntu\grubx64.efi
```

##### Ubuntu Live Repair

```bash
sudo add-apt add-apt-repository ppa:yannubuntu/boot-repair
sudo apt update
sudo apt install boot-repair
boot-repair
```

### 重装 Linux

- 自动挂载项 /etc/fstab etc/rc.local
- 自定义脚本-新建目录(加入环境变量)
- 自定义别名 ~/.bashrc

## SSH 命令

### Key

```bash
ssh-keygen -t rsa
ssh-add ~/.ssh/id_rsa
```

### SSHD

- config file in `/etc/ssh/sshd_config`

```bash
sudo systemctl reload sshd
sudo service restart sshd
```

### SSH Config File

`~/.ssh/config`:

- Host 别名
  - HostName 主机名(ip) `ssh user@ip`
  - Port 可忽略
  - User 登录用户名 `ssh user@ip`
  - PreferredAuthentications publickey
  - IdentityFile 密钥文件完整路径 `ssh -i file`

```bash
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa
Host cs.github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/cs
Host cloud
    HostName xx.org
    User  root
    IdentityFile ~/.ssh/dsl_private_key
Host bwg
    HostName 23.106.150.152
    User root
    Port 29692
```

```bash
git clone git@github.com:user/repo
git clone git@cs.github.com:user/repo
```

```bash
ssh -qTfnN -D 7070 bwg
google-chrome socks5 127.0.0.1 7070
```

### 密钥文件

- 登录远程主机：ssh -i hustlyl root@119.29.140.60
- 文件传输：sftp -i hustlyl root@119.29.140.60
- 登录数据库：mysql -h 10.66.135.125 -P 3306 -uroot -p

### 远程传输文件

```bash
rsync -ax -e 'ssh -c blowfish' /root/start_dir root@x.x.x.x:/root/dest_dir
```

```bash
sshpass -p "$DEPLOY_PASSWORD" \
  scp -o StrictHostKeyChecking=no \
      -P $DEPLOY_PORT \
      -r ./build $DEPLOY_USER@$DEPLOY_ADDR:/var/www/html
```

## 命令优先级

包含路径命令 ./vmtools.pl
\>别名命令
\>bash 内部命令
\>\$PATH 包含目录内的命令 /bin /sbin

## Linux 文件架构

```bash
man hier
```

通过源码包安装的软件，可以通过 ./configure --prefix=/opt/

/usr/src 是内核源码存放的目录

## Ubuntu

### Ubuntu Locale Settings

```bash
export LANG=en_US
xdg-user-dirs-gtk-update
export LANG=zh_CN
```

- /var/lib/locales/supported.d/local

```bash
sudo locale-gen zh_CN.GBK
sudo locale-gen zh_CN.GB18030
sudo dpkg-reconfigure locales
```

### Ubuntu Themes

#### Icon Themes

Nightly build for Numix Circle icon:

```bash
sudo add-apt-repository ppa:numix/ppa
sudo apt update
sudo apt install numix-icon-theme-circle
```

#### GTK Themes

GTK/GNOME themes located in `/usr/share/themes/` or `~/.themes/`:

```bash
# Vimix Cursors Installation
git clone https://github.com/vinceliuice/Vimix-cursors
sudo ./Vimix-cursors/install.sh

# WhiteSur GNOME theme Installation
git clone https://github.com/vinceliuice/WhiteSur-gtk-theme
sudo ./WhiteSur-gtk-theme/install.sh -t all -i ubuntu
# Tweak for Firefox
sudo ./WhiteSur-gtk-theme/tweaks.sh -f
# Tweak for Snap Apps
sudo ./WhiteSur-gtk-theme/tweaks.sh -s
# Tweak for GDM
sudo ./WhiteSur-gtk-theme/tweaks.sh -g -i ubuntu
# Tweak Help Docs
sudo ./WhiteSur-gtk-theme/tweaks.sh -h
```

Repair for not detected HDMI problem:

```bash
sudo dpkg-reconfigure gdm3
sudo apt install --reinstall gdm3 lightdm ubuntu-desktop
```

#### GNOME Shell Extension

- Install GNOME shell extension for browser.
- Install local binding app: `sudo apt install chrome-gnome-shell`.
- Visit `extensions.gnome.org` to install extensions.

## Arch Linux

### Basic Arch Linux Setup

```bash
less /usr/share/aif/docs/official_installation_guide_en
pacman -S lynx arch-wiki-docs arch-wiki-lite
lynx /usr/share/doc/arch-wiki/html/index.html
```

```bash
systemctl enable dhcpcd
reboot
pacman -S --needed base-devel git wget jshon expac yajl zsh vim
```

- makepkg

```bash
curl -L -O https://aur.archlinux.org/cgit/aur.git/snapshot/package_name.tar.gz
cd package_name
less PKGBUILD
less package_name.install

makepkg -si
# -s sync deps
# -i install
# -r rm deps
# -c clean up
```

### Pacman

- /etc/pacman.conf
- /etc/pacman.d/mirrorlist

### AUR

- [yaourt](https://archlinux.fr/yaourt-en)

```bash
# packages' list
wget https://aur.archlinux.org/packages.gz
```

## 命令操作

### 基本处理命令

#### ls

- -lh(long human)
- -ld(long directory)
- -i inode(ID 号) --color==auto

权限(user/group/other) 引用计数 user group 文件大小 文件修改时间 文件名

#### cd

- -上次目录
- ..上级目录

#### pwd

print working directory

#### rm

- –r delete directory
- –f delete forcely
- -i 显示确认信息

#### cp

- -r copy directory
- -p copy property
- -d copy link
- -a --all(-pdr)
- -i 显示确认信息

#### mv

无需参数(改名+移动)

- -i 显示确认信息

#### ln

link 命令 .bak/.hard(硬链接) .soft(软链接：创建链接时填写绝对路径)

ln -s(创建软链接) [原文件][目标文件]

### 基本搜索命令

#### locate

结合 updatedb 命令(该命令一般自动 1 天/次)

#### type

indicate how a command name is interpreted

#### apropos

display a list of appropriate commands

#### whereis/whatis

#### which

#### find

`find [搜索路径] [可选参数] [文件名](可加"")`:

- -name
- -iname 不区分大小写
- -user `user_name` 按照所有者搜索
- -nouser 搜索没有所有者的文件
- -atime(文件访问时间)/-ctime(改变文件属性)/-mtime(改变文件内容) -10(十天内)/10(十天当天)/+10(十天前)
- -size(文件大小) -25k(小于 25k)/25M(25M)/+25G(大于 25G)
- -inum `inode_number`
- -a / -o 逻辑与/逻辑或(左右两端搜索条件)
- -exec/-ok `system_command_list {} \;对搜索结果执行操作

#### grep

`grep` `[可选参数] “字符串” 文件名`:

- -I 不区分大小写
- -v 排除指定字符串

### Process Command

#### ps

report a snapshot of current processes

#### top

display tasks

#### jobs

list active jobs

#### bg

place a job in the background

#### fg

place a job in the foreground

#### kill

send a signal to a process

#### killall

kill processes by name

#### shutdown

shutdown or reboot the system

#### pstree

outputs a process list arranged in a tree-like pattern

#### vmstat

outputs a snapshot of system resource usage:
including memory, swap and disk I/O

#### xload/tload

draws a graph showing system load over time

#### screen

```bash
screen -S screenName
screen -ls
screen -r
```

- Ctrl+d // detach window
- Ctrl+k // kill window

### I/O Command

#### cat

concatenate files

#### sort

sort lines of text

#### uniq

report or omit repeated lines

#### wc

print newline, word, and byte counts for each file

#### head/tail

output the first/last part of a file

```bash
head -n 5 filename
tail -f filename
```

#### tee

read from standard input and write to standard output and files

```bash
[me@linuxbox ~]$ ls /usr/bin | tee ls.txt | grep zip
bunzip2
bzip2
....
```

#### nl

number lines

#### fold

wrap each line to a specified length

#### fmt

a simple text formatter

#### pr

prepare text for printing

#### printf

format and print data

### 帮助命令

#### man

- -f 显示操作等级
- -k 包含匹配
- -1/2/.../9 显示命令不同操作等级的帮助

1. Commands (Programs)
   Those commands that can be executed by the user from within a shell.
2. System calls
   Those functions which must be performed by the kernel.
3. Library calls
   Most of the libc functions.
4. Special files (devices)
   Files found in /dev.
5. File formats and conventions
   The format for /etc/passwd and other human-readable files.
6. Games
7. Conventions and miscellaneous
   Overviews of various topics, conventions and protocols,
   character set standards, and miscellaneous other things.
8. System management commands
   Commands like mount(8), many of which only root can execute.

#### help shell 内部命令

显示 shell 内部命令帮助，如 cd 命令(shell 内部命令)

#### info

显示大型帮助文档 - enter 进入 u 返回 p 上一节 n 下一节 q 退出

#### System Info

```bash
sudo add-apt-repository ppa:dawidd0811/neofetch
sudo apt-get update
sudo apt-get install neofetch
```

```bash
sudo apt-get install screenfetch
```

### 压缩命令

#### .zip

- zip -r(目录) 压缩文件 源文件/源目录
- unzip 源文件 -d 指定路径

#### .gz

- gzip 源文件
- gzip –c 源文件 > 压缩文件
- gzip -r 源目录 将源目录下所有子文件分别单独压缩
- gzip –d(解压缩) 文件
- gunzip 压缩文件

#### .bz2

不可压缩目录

- bzip2 –k(保留源文件) 源文件
- bzip2 –d(解压缩) –k(保留压缩文件) 压缩文件
- bunzip2 –k(保留压缩文件) 压缩文件

#### .tar.gz/.tar.bz2

tar [可选参数] 压缩文件(可指定压缩路径) [-c 解压缩路径]源文件/源目录

- -z 将.tar 压缩为.tar.gz -j 将.tar 压缩为.tar.bz2
- -c 打包 -x 解打包
- -t 查看压缩文件
- -v 显示过程
- -f 指定压缩文件名
- -C 指定解压缩路径
- -zcvf/-zxvf/-ztcf -jcvf/-jxvf/-jtvf

#### .7z

```bash
7z x manager.7z -r -o /home/xx
7z a -t7z -r manager.7z /home/manager/*
```

- a: add
- x: extract
- -r: recursive
- -o: specific path
- -t: type

### 用户命令

- w/who 查看用户详细信息
- last 显示所有用户登陆信息(/var/log/wtmp)
- lastlog 显示所有用户最后一次登陆时间(/var/log/lastlog)

### 用户管理命令

#### 组操作

##### 创建组

groupadd test

##### 修改组

groupmod -n test2 test -g

##### 删除组

groupdel test2

##### 查看组

- groups someuser
- cat /etc/group

```bash
cat /etc/passwd | awk -F [:] ‘{print $4}’
\ |sort|uniq | getent group |awk -F [:] ‘{print $1}’
```

#### 用户操作

##### 增加用户

```bash
useradd [options] LOGIN
```

Options:

- -b, --base-dir BASE_DIR 设置基本路径作为用户的登录目录
- -c, --comment COMMENT 对用户的注释
- -d, --home-dir HOME_DIR 设置用户的登录目录
- -D, --defaults 改变设置
- -e, --expiredate EXPIRE_DATE 设置用户的有效期
- -f, --inactive INACTIVE 用户过期后，让密码无效
- -g, --gid GROUP 使用户只属于某个组
- -G, --groups GROUPS 使用户加入某个组(附设组)
- -h, --help 帮助
- -k, --skel SKEL_DIR 指定其他的 skel 目录
- -K, --key KEY=VALUE 覆盖 /etc/login.defs 配置文件
- -m, --create-home 自动创建登录目录
- -l, 不把用户加入到 lastlog 文件中
- -M, 不自动创建登录目录
- -r, 建立系统账号
- -o, --non-unique 允许用户拥有相同的 UID
- -p, --password PASSWORD 为新用户使用加密密码
- -s, --shell SHELL 登录时候的 shell
- -u, --uid UID 为新用户指定一个 UID
- -Z, --selinux-user SEUSER use a specific SEUSER for the SELinux user mapping

```bash
useradd -s bash -m testuser
passwd testuser # modify `/etc/passwd`, then add to `/etc/sudoers`
```

`adduser` is a perl script which uses `useradd` binary in back-end,
`adduser` is more user friendly and interactive.

##### 修改用户

usermod -d /home/test -G test2 test

- -l 新用户名 旧用户名 修改用户名
- -g 新用户组 目标用户 改变用户所属组

gpasswd -a test test2 将用户 test 加入到 test2 组(附设组)

gpasswd -d test test2 将用户 test 从 test2 组中移出

```bash
usermod -aG sudo <username>
```

##### 删除用户

userdel test -r 同时删除用户登录目录(/home/xxx)

##### 查看用户

w/who 查看当前登录的所有用户

whoami 查看当前登录用户名

finger apacheuser 查看单个用户信息

##### 限制用户

- passwd -l 用户名 锁定用户
- passwd -u 用户名 解锁用户
- passwd -d 用户名 清除用户密码

### 权限管理命令

#### 普通权限

- chown 用户名：组名 文件名
- chgrp 组名 文件名
- umask 存储位置 ——/etc/profile
- 文件默认权限 = 文件默认最大权限 rw-(666) 减去 umask 值(如----w--w-)(022)
- 目录默认权限 = 目录默认最大权限 rwx(777) 减去 umask 值
- `id <username>`

#### ACL 权限

- 查看分区 ACL 权限是否开启 dumpe2fs -h 设备分区名
- 临时开启分区 ACL 权限 mount -o remount,acl 设备分区名
- 永久开启分区 ACL 权限 /etc/fstab

- setfacl -m (d:默认权限) u/g:用户名/组名:权限(rwx) 文件名
- getfacl 文件名——查看文件 ACL 权限

#### sudo 权限

/etc/sudoers.tmp

#### SetUID/SetGID 权限

可执行程序/目录+普通用户临时获得 root 权限 （rws）:

- chmod 0xxx 取消双权限
- chmod 2xxx 设置 SetGID 权限
- chmod 4xxx 设置 SetUID 权限
- chmod 6xxx 设置双权限

### 显示器管理命令

#### xrandr

```bash
xrandr -s 1920x1800 # set resolution
```

### 主机信息管理命令

```bash
#!/bin/bash

# Simple print cpu topology
# Author: kodango

# numactl --hardware
# ls /sys/devices/system/node/node0
# lscpu

function get_nr_processor()
{
    grep '^processor' /proc/cpuinfo | wc -l
}

function get_nr_socket()
{
    grep 'physical id' /proc/cpuinfo | awk -F: '{
            print $2 | "sort -un"}' | wc -l
}

function get_nr_siblings()
{
    grep 'siblings' /proc/cpuinfo | awk -F: '{
            print $2 | "sort -un"}'
}

function get_nr_cores_of_socket()
{
    grep 'cpu cores' /proc/cpuinfo | awk -F: '{
            print $2 | "sort -un"}'
}

echo '===== CPU Topology Table ====='
echo

echo '+--------------+---------+-----------+'
echo '| Processor ID | Core ID | Socket ID |'
echo '+--------------+---------+-----------+'

while read line; do
    if [ -z "$line" ]; then
        printf '| %-12s | %-7s | %-9s |\n' $p_id $c_id $s_id
        echo '+--------------+---------+-----------+'
        continue
    fi

    if echo "$line" | grep -q "^processor"; then
        p_id=`echo "$line" | awk -F: '{print $2}' | tr -d ' '`
    fi

    if echo "$line" | grep -q "^core id"; then
        c_id=`echo "$line" | awk -F: '{print $2}' | tr -d ' '`
    fi

    if echo "$line" | grep -q "^physical id"; then
        s_id=`echo "$line" | awk -F: '{print $2}' | tr -d ' '`
    fi
done < /proc/cpuinfo

echo

awk -F: '{
    if ($1 ~ /processor/) {
        gsub(/ /,"",$2);
        p_id=$2;
    } else if ($1 ~ /physical id/){
        gsub(/ /,"",$2);
        s_id=$2;
        arr[s_id]=arr[s_id] " " p_id
    }
}

END{
    for (i in arr)
        printf "Socket %s:%s\n", i, arr[i];
}' /proc/cpuinfo

echo
echo '===== CPU Info Summary ====='
echo

nr_processor=`get_nr_processor`
echo "Logical processors: $nr_processor"

nr_socket=`get_nr_socket`
echo "Physical socket: $nr_socket"

nr_siblings=`get_nr_siblings`
echo "Siblings in one socket: $nr_siblings"

nr_cores=`get_nr_cores_of_socket`
echo "Cores in one socket: $nr_cores"

let nr_cores*=nr_socket
echo "Cores in total: $nr_cores"

if [ "$nr_cores" = "$nr_processor" ]; then
    echo "Hyper-Threading: off"
else
    echo "Hyper-Threading: on"
fi

echo
echo '===== END ====='
```

### 磁盘管理命令

主分区(primary)与延伸分区(extended) 延伸分区可以继续划分成逻辑分区(logical)

#### 挂载命令

mount [-t 文件系统][-o 特殊选项] 设备文件名 挂载点(挂载目录/media /misc /mnt)

- 无参数 显示当前挂载设备
- -a 依据/etc/fstab 文件配置,自动挂载

umount 设备文件名/挂载点

fdisk –l

#### 修复命令

```bash
sudo debugfs /dev/sda9
> debugfs: lsdel
```

#### 分区命令

##### fdisk

分区表类型 MBR

n p e l 新 主 逻辑 扩展 分区 w 激活

##### parted

分区表类型 MBR/GPT

- mklabel 选择分区表类型
- print 打印分区信息
- mkpart 新建分区
- rm 删除分区
- unit 选择单位
- quit 结束分区

### 包管理命令

#### rpm 命令

安装和卸载时同时存在依赖性(包依赖、库依赖)

rpm 查询:

- -q 包名 查询已安装的包 //必备参数
- -a 查询所有已安装的包
- -i 查询软件信息
- -l list
- -f 查询系统文件属于哪个软件包
- -R 查询软件包的依赖性
- -p 查询未安装包 //普适参数

rpm 校验(查看 Cracker 信息):

- -V 校验已安装包 相应信息不是.号便是被修改项 可用于找回丢失的系统命令

#### yum

源配置文件:/etc/yum.repos.d

```bash
cd /etc/yum.repos.d
mv CentOS-Base.repo CentOS-Base.repo.bk
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
yum makecache
```

- yum list
- yum search 'keyword'
- yum -y(自动回答 yes) install 包名
- yum -y update 包名
- yum -y remove 包名
- yum grouplist
- yum groupinstall 软件组名
- yum groupremove 软件组名

#### 源码包安装

指定位置:

- /usr/local/软件名/
- /usr/local/src/软件名/

(如上述脚本出错，执行 make clean）

```bash
make install
```

e.g apche /var/www/html/index.html /usr/local/apache/htdocs/index.html

#### Applications Management

- desktop shortcut: `/usr/share/applications`
- startup apps: `gnome-session-properties` or `gnome-tweaks`

### 网络连接命令

#### wget

- 下载全站资料
- -P 表示下载到哪个目录
- -r 表示递归下载
- -np 表示不下载旁站连接.
- -k 表示将下载的网页里的链接修改为本地链接.
- -p 获得所有显示网页所需的元素

```bash
wget -r -p -np -k -P ~/tmp/ http://java-er.com
```

#### Certbot

[Certbot](https://github.com/certbot/certbot)
for SSL certificates.

#### GFW

- [Hosts](https://github.com/racaljk/hosts)
- [RSS](https://github.com/breakwa11/shadowsocks-rss)
- [ChinaDNS](https://github.com/shadowsocks/ChinaDNS-Python)
- [Sshuttle](https://github.com/apenwarr/sshuttle)
- [ProxyChains](https://github.com/rofl0r/proxychains-ng)
- [OpenVPN](https://github.com/OpenVPN/openvpn)
- [VPNGate](https://github.com/waylau/vpngate-mirrors)
- [DockerVPN](https://github.com/hwdsl2/docker-ipsec-vpn-server)

```bash
yum install python-setuptools && easy_install pip
pip install shadowsocks
echo "nohup sslocal -c /etc/shadowsocks.json /dev/null 2>&1 &" /etc/rc.local
nohup ssserver -c /etc/shadowsocks.json -d start /dev/null 2>&1 &
```

### 网络管理命令

| 用途           | net-tool(被淘汰) | iproute2         |
| :------------- | :--------------- | :--------------- |
| 地址和链路配置 | ifconfig         | ip addr, ip link |
| 路由表         | route            | ip route         |
| 邻居           | arp              | ip neigh         |
| VLAN           | vconfig          | ip link          |
| 隧道           | iptunnel         | ip tunnel        |
| 组播           | ipmaddr          | ip maddr         |
| 统计           | netstat          | ss               |

```bash
ip link show
ip address show
ip route show

# add commands to /etc/init.d/local.sh

rm -fr /etc/udev/rules.d/70-persistent-net.rules

# start up network adapter
ip link set eth0 up

# add/delete static ip
ip address add 192.168.1.1/24 dev eth0
ip address del 192.168.1.1/24 dev eth0

# add/delete static route
ip route add 192.168.1.0/24 dev eth0
ip route del 192.168.1.0/24 dev eth0
ip route add default via 192.168.0.196

# watch packets
watch -n 1 "ifconfig eth0"
watch -n 1 "ifconfig eth1"
watch -n 1 "ifconfig eth2"
```

#### ufw

```bash
ufw status
ufw enable
ufw allow ssh
ufw allow http
ufw allow https
```

#### arp

`arp -a`显示地址解析协议(IP 地址—网卡地址):

- 网际互联层：IP 协议(网际)、IGMP 协议(互联网组管理)、ICMP 协议(互联网控制报文)
- 传输层：TCP 协议(传输控制)、UDP 协议(用户数据报)

#### netstat

`netstat -an`查看本机启用的端口:

- (-a 查看所有连接和监听端口 -n 显示 IP 地址和端口号)
- -t tcp 协议端口
- -u udp 协议端口
- -l 监听状态服务

#### nslookup

`nslookup domain_name`查看 DNS 解析器:

/etc/network/interfaces

主机名:

- /etc/hostname
- /etc/sysconfig/network
- /etc/resolv.conf

#### ping

`ping -c ip/domain`探测网络状况

#### telnet

`telnet [ip/domain] [端口]`远程管理与端口探测命令

#### traceroute

- `traceroute [-n IP] domain`路由跟踪命令
- `traceroute -n -I -T -p`路由扫描

#### NetFilter 框架

nftables 命令行工具：nft

### 网络扫描命令

预防策略——SYN 攻击、DDOS 攻击

#### fping

`fping -a -u -g -f [target]`批量扫描主机地址

#### hping

`hping -p -S -a`可伪造IP地址

#### mtr

路由扫描

#### nmap

批量主机服务扫描:

- -P ICMP
- -sS TCP SYN
- -sT TCP connect()
- -sU UDP

#### ncat

批量主机服务扫描:

- -w 设置超时时间
- -v 显示命令执行过程
- -z 一个输入输出模式
- -u UDP 协议

### 脚本运行命令

exec 1>>output.log
exec 2>>error.log

#### Systemctl

```bash
systemctl enable local
```

in `/etc/init.d/local`

```bash
#!/bin/bash
### BEGIN INIT INFO
# Provides:          local
# Required-Start:    $all
# Required-Stop:
# Default-Start:     3 4 5
# Default-Stop:
# Short-Description: Personal start script

sslocal -c shadowsocks.json -d start
```

#### 定时任务

##### crontab

- `/etc/crontab`
- [Crontab Quick Tutorial](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)
- [Crontab Generator](https://crontab.guru)

```bash
crontab -l(list)
crontab -e(establish)
```

- m,n —— 分隔多个时间
- m-n —— 表示时间范围
- /n —— 表示每隔 n 时间
- 天数 与 星期 设置 之间 是 “或”关系
- /var/spool/cron/user_name/
- /var/log/con
- /etc/cron.\*ly 时间表
- /etc/anacrontab: 异步时间表

#### 后台任务

- jobs —— 所有作业
- atq —— 延时作业队列

- at -M(不使用邮件发送运行结果) -f filename deltatime
- atrm 作业号/名

- bg/fg 作业号/名
- nohup 脚本 & —— 脱离控制台并后台运行脚本

19 ~ -20 （-20 优先级最高）

- nice -n number 作业号/名
- renice number -p PID

#### 开机任务

- /etc/rc.local —— 系统开机任务
- /etc/profile/ /etc/bash.bashrc —— bash 启动任务/远程登陆任务
- /etc/bash.bashrc —— SSH 连接任务

### 历史记录命令

#### history

- -c 清除历史命令
- -w (~/.bash_history) 保存历史命令

/etc/profile 中修改 HISTSIZE !n/!!/!字符串 重复执行第 n 条/上一条/指定开头的历史命令

```bash
# repeat history command
!number
```

#### ctrl-r

press ctrl-r 提示符改变，显示我们正在执行反向增量搜索。
搜索过程是”反向的”，因为我们按照从”现在”到过去 某个时间段的顺序来搜寻。
下一步，我们开始输入要查找的文本搜索返回我们需要的结果。
(enter to execute, ctrl-j to copy)

#### History Shortcuts

| command | function                             |
| :------ | :----------------------------------- |
| Ctrl-p  | 移动到上一个历史条目                 |
| Ctrl-n  | 移动到下一个历史条目                 |
| Alt-<   | 移动到历史列表开头                   |
| Alt->   | 移动到历史列表结尾                   |
| Ctrl-r  | 反向增量搜索                         |
| Alt-p   | 反向搜索，非增量搜索                 |
| Alt-n   | 向前搜索，非增量                     |
| Ctrl-o  | 执行历史列表中的当前项，并移到下一个 |

### Device Command

#### Monitor Info

```bash
sudo apt-get install read-edid
sudo get-edid | parse-edid
```

#### Touchpad Synaptics

```bash
synclient TouchpadOff=0
```

### 并行命令

命令间插入符

- command1;command2 顺序执行，相当于 C 语言中语句结束符
- command1&&command2 命令同时执行(当 1 正确时)或同时不执行(当 1 出错时)
- command1 || command2 只执行一个命令(正确命令)
- command1 | command2 前一正确命令的输出结果作为后一命令的输入结果

> e.g ls && echo yes >> .log || echo no >> .log

### C/C++ Binary Command

#### ldd

```bash
ldd ./lib.sio
```

#### nm

```bash
nm -Ca ./lib.so
```

### Plot Command

chart.gp

```bash
#!/usr/bin/env gnuplot

set term wxt enhanced
set xtics
set view
set multiplot
set size
set origin
fit

plot 'data.dat' using 1:2, 'data.dat' using 1:3
```

```bash
#!/usr/bin/gnuplot -c

set terminal png enhanced
set output ARG1.".png"
set style data linespoints
show timestamp
set title ARG1
set xlabel "time (seconds)"
set ylabel "Segments (cwnd, ssthresh)"
plot ARG1 using 1:7 title "snd_cwnd", \
     ARG1 using 1:($8>=2147483647 ? 0 : $8) title "snd_ssthresh"
```

### Other Command

#### Time

```bash
date
```

change ntp (Network Time Protocol) time

```bash
sudo apt-get install ntpdate
sudo iptables -A OUTPUT -p udp --dport 123 -j ACCEPT
sudo iptables -A INPUT -p udp --sport 123 -j ACCEPT
sudo ntpdate time.windows.com
sudo hwclock --localtime --systohc
```

use local time (not UTC time)

```bash
sudo timedatectl set-local-rtc 1
```

## Shell 编程

### Warings

- = 左右无空格
- () [] 内部最好有空格
- 数值运算用 (()) 或 \$(())

### 文件重定向

- `>` 文件名/输出设备名 覆盖标准输出重定向
- `>>` 文件名/输出设备名 追加标准输出重定向
- 2>(右端无空格)文件名/输出设备名 覆盖错误输出重定向
- 2>>(右端无空格)文件名/输出设备名 追加错误输出重定向
- `>/>> 文件 2>&1 &>/&>>文件` 覆盖/追加正确输出与错误输出同时重定向
- `</<<` 文件名/输入设备名 覆盖/追加标准输入重定向

#### Here Document

```bash
commnad << END
...
END

command << EOF
...
EOF
```

```bash
#!/bin/bash
gnuplot -persist <<EOF
set data style linespoints
show timestamp
set title "$1"
set xlabel "time (seconds)"
set ylabel "Segments (cwnd, ssthresh)"
plot "$1" using 1:7 title "snd_cwnd", \\
     "$1" using 1:(\$8>=2147483647 ? 0 : \$8) title "snd_ssthresh"
EOF
```

### 变量

#### 基本变量

- `=` : 左右两端不可有空格
- `' '`: 完全标准字符串
- `" "`: 格式化字符串
- 调用变量值：\$变量名
- set/unset——设置/取消变量

#### built-in 变量

- `$*`/`$@`: `argv[1], ..., argv[n]`
- `$0/$1/../$n`: `argv[0], ..., argv[n]`
- `$#`: argc
- `$?`: exit code of last command

```bash
if [ "$?" -ne "0" ];then
    echo "sorry, command execution failed!"
fi
```

每次 shift 命令执行的时候，变量 $2 的值会移动到变量 $1 中，变量 $3 的值会移动到变量 $2 中.
变量 \$# 的值也会相应的减 1

```bash
#!/bin/bash
# posit-param2: script to display all arguments
count=1
while [[ $# -gt 0 ]]; do
    echo "Argument $count = $1"
    count=$((count + 1))
    shift
done
```

```bash
usage () {
    echo "$PROGNAME: usage: $PROGNAME [-f file | -i]"
    return
}
# process command line options
interactive=
filename=
while [[ -n $1 ]]; do
    case $1 in
    -f | --file)            shift
                            filename=$1
                            ;;
    -i | --interactive)     interactive=1
                            ;;
    -h | --help)            usage
                            exit
                            ;;
    *)                      usage >&2
                            exit 1
                            ;;
    esac
    shift
done
```

#### 环境变量

- /etc/profile.d/\*.sh
- ~/.bash_profile
- ~/.bashrc
- /etc/profile
- /etc/bash.bashrc
- /etc/issue——shell 登录信息
- PS1 环境变量——shell 头行打印信息
- PATH 环境变量

##### Env Commnad

- env——查看环境变量
- export 变量名=变量值——设置环境变量
- printenv

### 数值运算

#### declare 命令

### Bash Expansions

- `$(())` or `$[]`: arithmetic expansion

一般地, 将数值运算用 `(())` `[[]]` 或 `$(())` 括起, 可以确保变量不会被识别为 string

```bash
read x
read y

echo $((x + y))
echo $((a < b ? a : b))

if ((a > b))
then
    echo "a > b"
fi

if [[ a -gt b ]]
then
    echo "a > b"
fi

if [ "$a" -gt "$b" ]
then
    echo "a > b"
fi
```

- `[[ xxx ]]`: condition
- `(( xxx ))`: arithemetic condition

| operator              | function                                          |
| :-------------------- | :------------------------------------------------ |
| ! EXPRESSION          | The EXPRESSION is false                           |
| -n STRING             | The length of STRING is greater than zero         |
| -z STRING             | The lengh of STRING is zero (ie it is empty)      |
| STRING1 == STRING2    | STRING1 is equal to STRING2                       |
| STRING1 != STRING2    | STRING1 is not equal to STRING2                   |
| STRING1 > STRING2     | STRING1 sorts after STRING2                       |
| STRING1 < STRING2     | STRING1 sorts before STRING2                      |
| INTEGER1 -eq INTEGER2 | INTEGER1 is numerically equal to INTEGER2         |
| INTEGER1 -gt INTEGER2 | INTEGER1 is numerically greater than INTEGER2     |
| INTEGER1 -lt INTEGER2 | INTEGER1 is numerically less than INTEGER2        |
| -d FILE               | FILE exists and is a directory                    |
| -e FILE               | FILE exists                                       |
| -r FILE               | FILE exists and the read permission is granted    |
| -s FILE               | FILE exists and it's size is greater than zero    |
| -w FILE               | FILE exists and the write permission is granted   |
| -x FILE               | FILE exists and the execute permission is granted |
| `AND -a &&`           |                                                   |
| `OR -o ||`            |                                                   |
| `NOT ! !`             |                                                   |

- {}: group regexp

```bash
echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b
```

- `${}`: string expansion
  - `${parameter:-word}`: 若 parameter 没有设置（例如，不存在）或者为空，展开结果是 word 的值。
    若 parameter 不为空，则展开结果是 parameter 的值
  - `${parameter:+word}`: 若 parameter 没有设置或为空，展开结果为空。
    若 parameter 不为空， 展开结果是 word 的值会替换掉 parameter 的值
  - `${parameter:=word}`: 若 parameter 没有设置或为空，展开结果是 word 的值。
    另外，word 的值会赋值给 parameter。
    若 parameter 不为空，展开结果是 parameter 的值
  - `${parameter:?word}`: 若 parameter 没有设置或为空，这种展开导致脚本带有错误退出，
    并且 word 的内容会发送到标准错误。
    若 parameter 不为空， 展开结果是 parameter 的值
  - `${!prefix*}` `${!prefix@}`: 这种展开会返回以 prefix 开头的已有变量名
  - `${#parameter}`: 展开成由 parameter 所包含的字符串的长度
  - `${parameter:offset}` `${parameter:offset:length}`: 提取一部分字符
  - `${parameter,,}` 把 parameter 的值全部展开成小写字母
  - `${parameter,}` 仅仅把 parameter 的第一个字符展开成小写字母
  - `${parameter^^}` 把 parameter 的值全部转换成大写字母
  - `${parameter^}` 仅仅把 parameter 的第一个字符转换成大写字母
  - `${parameter#pattern}` `${parameter##pattern}`,
    `${parameter%pattern}` `${parameter%%pattern}`: 从 paramter 所包含的字符串中清除开头/末尾一部分文本
  - `${parameter/pattern/string}`, `${parameter//pattern/string}`,
    `${parameter/#pattern/string}`, `${parameter/%pattern/string}`: replace

```bash
foo=file.txt.zip
echo ${foo#*.}
txt.zip
echo ${foo##*.}
zip

foo=file.txt.zip
echo ${foo%.*}
file.txt
echo ${foo%%.*}
file
```

```bash
foo=JPG.JPG
echo ${foo/JPG/jpg}
jpg.JPG
echo ${foo//JPG/jpg}
jpg.jpg
echo ${foo/#JPG/jpg}
jpg.JPG
echo ${foo/%JPG/jpg}
JPG.jpg
```

- \$(): command result
- "": allow expansions string
- '': disallow expansions string

### 流程控制语句

#### if 语句

```bash
if [[ 条件判断式 ]] ; then
    程序
fi
if [[ 条件判断式 ]]
    then
        程序
    else
        程序
fi

if [[ 条件判断式1 ]]
    then
        程序1
elif [[ 条件判断式2 ]]
    then
        程序2
……
else
        程序n
fi
```

#### case 语句

```bash
case $变量名 in
    “值1”)
            程序
            ;;
    “值2”)
            程序
            ;;
    *)
            程序
;;
esac
```

| case pattern   | function                              |
| :------------- | :------------------------------------ |
| `a)`           | word equals "a"                       |
| `[[:alpha:]])` | word is a single alphabetic character |
| `???)`         | word is exactly three characters long |
| `\*.txt)`      | word ends with the characters “.txt”  |
| `*)`           | any value of word                     |

```bash
#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Please Select:
1. Display System Information
2. Display Disk Space
3. Display Home Space Utilization
0. Quit
"
read -p "Enter selection [0-3] > "
case $REPLY in
    0)  echo "Program terminated."
        exit
        ;;
    1)  echo "Hostname: $HOSTNAME"
        uptime
        ;;
    2)  df -h
        ;;
    3)  if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        ;;
    *)  echo "Invalid entry" >&2
        exit 1
        ;;
esac
```

or case pattern

```bash
#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Please Select:
A. Display System Information
B. Display Disk Space
C. Display Home Space Utilization
Q. Quit
"
read -p "Enter selection [A, B, C or Q] > "
case $REPLY in
q|Q) echo "Program terminated."
     exit
     ;;
a|A) echo "Hostname: $HOSTNAME"
     uptime
     ;;
b|B) df -h
     ;;
c|C) if [[ $(id -u) -eq 0 ]]; then
         echo "Home Space Utilization (All Users)"
         du -sh /home/*
     else
         echo "Home Space Utilization ($USER)"
         du -sh $HOME
     fi
     ;;
*)   echo "Invalid entry" >&2
     exit 1
     ;;
esac
```

fall through case pattern (`;;&`)

```bash
#!/bin/bash
# case4-2: test a character
read -n 1 -p "Type a character > "
echo
case $REPLY in
    [[:upper:]])    echo "'$REPLY' is upper case." ;;&
    [[:lower:]])    echo "'$REPLY' is lower case." ;;&
    [[:alpha:]])    echo "'$REPLY' is alphabetic." ;;&
    [[:digit:]])    echo "'$REPLY' is a digit." ;;&
    [[:graph:]])    echo "'$REPLY' is a visible character." ;;&
    [[:punct:]])    echo "'$REPLY' is a punctuation symbol." ;;&
    [[:space:]])    echo "'$REPLY' is a whitespace character." ;;&
    [[:xdigit:]])   echo "'$REPLY' is a hexadecimal digit." ;;&
esac
```

#### for 语句

```bash
for 变量 in 值1 值2 值3 …… 值n
    do
        程序
    done

$(seq 1 50)  # 1 2 ... 50
{1..50}     # 1 2 ... 50
{0..10..2}  # 0 2 4 6 8 10

for (( 初始值;循环控制条件;变量变化 )); do
    程序
done
```

#### while 语句与 until 语句

```bash
while [[ 条件判断式 ]]
    do
        程序
    done

until [[ 条件判断式 ]]
    do
        程序
    done
```

```bash
(( expression1 ))
while (( expression2 )); do
    commands
    (( expression3 ))
done
```

```bash
#!/bin/bash
# while-menu: a menu driven system information program
DELAY=3 # Number of seconds to display results
while [[ $REPLY != 0 ]]; do
    clear
    cat <<- _EOF_
        Please Select:
        1. Display System Information
        2. Display Disk Space
        3. Display Home Space Utilization
        0. Quit
    _EOF_
    read -p "Enter selection [0-3] > "
    if [[ $REPLY =~ ^[0-3]$ ]]; then
        if [[ $REPLY == 1 ]]; then
            echo "Hostname: $HOSTNAME"
            uptime
            sleep $DELAY
        fi
        if [[ $REPLY == 2 ]]; then
            df -h
            sleep $DELAY
        fi
        if [[ $REPLY == 3 ]]; then
            if [[ $(id -u) -eq 0 ]]; then
                echo "Home Space Utilization (All Users)"
                du -sh /home/*
            else
                echo "Home Space Utilization ($USER)"
                du -sh $HOME
            fi
            sleep $DELAY
        fi
    else
        echo "Invalid entry."
        sleep $DELAY
    fi
done
echo "Program terminated."
```

```bash
#!/bin/bash
# while-read: read lines from a file
while read distro version release; do
    printf "Distro: %s\tVersion: %s\tReleased: %s\n" \
        $distro \
        $version \
        $release
done < distros.txt
```

#### do while statement

```bash
while : ; do
    actions
    [[ current_time <= $cutoff ]] || break
done
```

### Bash Array

- [Array Reference](http://billie66.github.io/TLCL/book/chap36.html)

### Bash Function

- 函数局部变量 local + 变量名
- 函数参数 : \$ + #/？/@/n
- 引用函数库文件 —— source sh 文件名 / . sh 文件名 可修改~/.bashrc 文件

### Bash IO

```bash
#!/bin/bash
# read-validate: validate input
invalid_input () {
    echo "Invalid input '$REPLY'" >&2
    exit 1
}
read -p "Enter a single item > "
# input is empty (invalid)
[[ -z $REPLY ]] && invalid_input
# input is multiple items (invalid)
(( $(echo $REPLY | wc -w) > 1 )) && invalid_input
# is input a valid filename?
if [[ $REPLY =~ ^[-[:alnum:]\._]+$ ]]; then
    echo "'$REPLY' is a valid filename."
    if [[ -e $REPLY ]]; then
        echo "And file '$REPLY' exists."
    else
        echo "However, file '$REPLY' does not exist."
    fi
    # is input a floating point number?
    if [[ $REPLY =~ ^-?[[:digit:]]*\.[[:digit:]]+$ ]]; then
        echo "'$REPLY' is a floating point number."
    else
        echo "'$REPLY' is not a floating point number."
    fi
    # is input an integer?
    if [[ $REPLY =~ ^-?[[:digit:]]+$ ]]; then
        echo "'$REPLY' is an integer."
    else
        echo "'$REPLY' is not an integer."
    fi
else
    echo "The string '$REPLY' is not a valid filename."
fi
```

```bash
#!/bin/bash
# read-menu: a menu driven system information program
clear
echo "
Please Select:

    1. Display System Information
    2. Display Disk Space
    3. Display Home Space Utilization
    0. Quit
"
read -p "Enter selection [0-3] > "

if [[ $REPLY =~ ^[0-3]$ ]]; then
    if [[ $REPLY == 0 ]]; then
        echo "Program terminated."
        exit
    fi
    if [[ $REPLY == 1 ]]; then
        echo "Hostname: $HOSTNAME"
        uptime
        exit
    fi
    if [[ $REPLY == 2 ]]; then
        df -h
        exit
    fi
    if [[ $REPLY == 3 ]]; then
        if [[ $(id -u) -eq 0 ]]; then
            echo "Home Space Utilization (All Users)"
            du -sh /home/*
        else
            echo "Home Space Utilization ($USER)"
            du -sh $HOME
        fi
        exit
    fi
else
    echo "Invalid entry." >&2
    exit 1
fi
```

```bash
# interactive mode
if [[ -n $interactive ]]; then
    while true; do
        read -p "Enter name of output file: " filename
        if [[ -e $filename ]]; then
            read -p "'$filename' exists. Overwrite? [y/n/q] > "
            case $REPLY in
            Y|y)    break
                    ;;
            Q|q)    echo "Program terminated."
                    exit
                    ;;
            *)      continue
                    ;;
            esac
        elif [[ -z $filename ]]; then
            continue
        else
            break
        fi
    done
fi
```

### 信号

- man 7 signal —— 传递信号给进程
- CTRL + C —— SIGINT
- CTRL + Z —— SIGSTP
- kill/killall —— SIGINT
- trap SIG\*/EXIT —— 捕捉信号(后 + 忽略信号/默认处理信号/自定义处理信号)
- trap – SIG\*/EXIT —— 移除信号

### Bash Debugging

`-x` option

```bash
#!/bin/bash -x
# trouble: script to demonstrate common errors
number=1
if [ $number = 1 ]; then
    echo "Number is equal to 1."
else
    echo "Number is not equal to 1."
fi
```

```bash
#!/bin/bash
# trouble: script to demonstrate common errors
number=1
echo "number=$number" # DEBUG
set -x # Turn on tracing
if [ $number = 1 ]; then
    echo "Number is equal to 1."
else
    echo "Number is not equal to 1."
fi
set +x # Turn off tracing
```

### Shell Script Best Practices

- [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html)
- 指定默认解释器`cat /etc/shells`
- 设置`bash strict mode`
- 条件判断使用`[[ ]]`
- 使用变量时用双引号把变量包起来 `cp -r "$src_dir" "$dest_dir"`
- 使用`$()`获取表达式的值
- 使用`${arr[@]}`进行列表循环

```bash
#!/usr/bin/env bash

# 设置命令回显
set -x

# 遇到未声明的变量则报错停止
set -u
# 遇到执行错误则停止
set -e
# 管道命令其中一步失败则中止
set -o pipefail
```

### Interactive Shell Script Tips

#### Check Root Validation

```bash
if (( $EUID != 0 )); then
    echo "Please run as root!"
    exit
fi
```

```bash
# run as root directly
sudo chown root <filename>
sudo chmod +s <filename>
```

#### Bash help option

```bash
#!/bin/sh
if [[ ${#@} -ne 0 ]] && [[ "${@#"--help"}" = "" ]]; then
  printf -- '...help...\n';
  exit 0;
fi;
```

#### Bash slient option

```bash
#!/bin/sh
if [[ ${#@} -ne 0 ]] && [[ "${@#"--silent"}" = "" ]]; then
  stty -echo;
fi;
# ...
# before point of intended output:
stty +echo && printf -- 'intended output\n';
# silence it again till end of script
stty -echo;
# ...
stty +echo;
exit 0;
```

#### Check Command Validation

```bash
#!/bin/sh
_=$(command -v docker);
if [[ "$?" != "0" ]]; then
  printf -- 'You don\'t seem to have Docker installed.\n';
  printf -- 'Get it: https://www.docker.com/community-edition\n';
  printf -- 'Exiting with code 127...\n';
  exit 127;
fi;
```

##### Get Absolute Path

```bash
#!/bin/sh
CURR_DIR="$(dirname $0);"
printf -- 'moving application to /opt/app.jar';
mv "${CURR_DIR}/application.jar" /opt/app.jar;
```

#### Bash error handle

```bash
#!/bin/sh
error_handle() {
  stty echo;
}

if [[ ${#@} -ne 0 ]] && [[ "${@#"--silent"}" = "" ]]; then
  stty -echo;
  trap error_handle INT;
  trap error_handle TERM;
  trap error_handle KILL;
  trap error_handle EXIT;
fi;
# ...
```

#### Bash loading progress

```bash
#!/bin/sh
printf -- 'Performing asynchronous action..';
./trigger-action;
DONE=0;
while [ $DONE -eq 0 ]; do
  ./async-checker;
  if [ "$?" = "0" ]; then DONE=1; fi;
  printf -- '.';
  sleep 1;
done;
printf -- ' DONE!\n';
```

## Terminal

```bash
sudo update-alternatives --install /usr/bin/x-terminal-emulator
 \ x-terminal-emulator /opt/Hyper/hyper 50
```

```bash
sudo update-alternatives --config x-terminal-emulator
```

### Tmux

#### Basic Tmux Command

```bash
tmux ls
tmux new -s sessionID
tmux a -t sessionID # attach
tmux show -g >> current.tmux.conf # export configuration
```

#### Basic Hotkeys

```bash
?        # 快捷键帮助列表
```

##### Session management

```bash
:new<CR> # 创建新的 Session，其中 : 是进入 Tmux 命令行的快捷键
s list sessions
$ rename the current session
d detach from the current session
```

##### Tmux Windows Hotkeys

```bash
c create a new window
, rename the current window
w list windows
% split horizontally
" split vertically
n change to the next window
p change to the previous window
0 to 9 select windows 0 through 9
```

##### Tmux Panes Hotkeys

```bash
% create a horizontal pane
" create a vertical pane
<space>  # 切换 Pane 布局
h move to the left pane. *
j move to the pane below *
l move to the right pane *
k move to the pane above *
q show pane numbers
o toggle between panes
} swap with next pane
{ swap with previous pane
! break the pane out of the window
x kill the current pane
t        # 显示一个时钟
```

##### Tmux Scroll

- `C-a + [` to into scoll mode, `q` to quit scoll mode
- copy mode can scoll too
- `set -g mouse on` for enabling mouse scolling

#### Configuration

```bash
# C-b is not acceptable -- Vim uses it
set-option -g prefix C-a
bind-key C-a last-window

# Start numbering at 1
set -g base-index 1

# Allows for faster key repetition
set -s escape-time 0

# Set status bar
set -g status-bg black
set -g status-fg white
set -g status-left ""
set -g status-right "#[fg=green]#H"

# Enable scroll mouse
set -g mouse on

# Rather than constraining window size to the maximum size of any client
# connected to the *session*, constrain window size to the maximum size of any
# client connected to *that window*. Much more reasonable.
setw -g aggressive-resize on

# Allows us to use C-a a <command> to send commands to a TMUX session inside
# another TMUX session
bind-key a send-prefix

# Reload configuration
bind r source-file ~/.tmux.conf \; display-message "Config reloaded"

# Escape to enter copy mode, v to selection, y to yank, p to paste
bind Escape copy-mode
bind-key -T copy-mode-vi 'v' send -X begin-selection
bind-key -T copy-mode-vi 'y' send -X copy-selection-and-cancel
# bind-key -t vi-copy v begin-selection
# bind-key -t vi-copy y copy-pipe "reattach-to-user-namespace pbcopy"
unbind p
bind p pasteb

setw -g mode-keys vi      # Vi

# Highlight active window
set-window-option -g window-status-current-bg red
```

## Perf Tools

### uptime

### Top Command

```bash
top
```

### dmesg

```bash
dmesg | tail
```

### mpstat

```bash
mpstat -P ALL 1
```

### pidstat

```bash
pidstat 1
```

### iostat

```bash
iostat -xz 1
```

### free

```bash
free -m
```

### sar

```bash
`sar -n DEV 1`
```

```bash
`sar -n TCP,ETCP 1`
```

### perf

[Perf Examples](http://www.brendangregg.com/perf.html)

```bash
perf list # events
perf stat <command>
perf stat -e <events> <command>
perf record -e <events> -a <command>
perf report
```

## Linux Tools

### FFmpeg

```bash
# https://www.yanxurui.cc/posts/tool/2017-10-07-use-ffmpeg-to-edit-video
ffmpeg -global_options -input_1_options -i input_1 -input_2_options -i input_2 \
  -output_1_options output_1 ...
```

#### FFmpeg Probe

```bash
ffprobe input.mp4
ffmpeg -hide_banner -i input.mkv
```

#### FFmpeg Transform

- `MP4`: `H264`Video + `ACC`Audio
- `WebM`: `VP8`Video + `Vorbis`Audio
- `OGG`: `Theora`Video + `Vorbis`Audio

```bash
# code decoder information
ffmpeg -codecs
```

```bash
# mkv to mp4
ffmpeg -i input.mkv -codec copy output.mp4
```

```bash
# compress
ffmpeg -i input.mkv -c copy -c:v libx264 -vf scale=-2:720 output.mkv
```

```bash
# make mkv with video and subtitle
ffmpeg -i input.avi -i input.srt \
  -map 0:0 -map 0:1 -map 1:0 -c:v libx264 -c:a aac -c:s srt output.mkv
```

```bash
# flac to mp3
ffmpeg -i "Michael Jackson - Billie Jean.flac" \
  -ab 320k "Michael Jackson - Billie Jean.mp3"
ffmpeg -i music_flac.flac \
  -acodec libmp3lame      \
  -ar 44100               \
  -ab 320k                \
  -ac 2 music_flac_mp3.mp3
# - acodec: Audio Coder Decoder 音频编码解码器
# - libmp3lame: MP3 解码器
# - ar: audio rate 音频采样率, 默认用原音频的采样率
# - ab: audio bit rate 音频比特率, 默认 128K
# - ac: aduio channels 音频声道, 默认采用源音频的声道数
```

```bash
# mp4 to avi
ffmpeg -i video.mp4 \
  -s 1920x1080      \
  -pix_fmt yuv420p  \
  -vcodec libx264   \
  -preset medium    \
  -profile:v high   \
  -level:v 4.1      \
  -crf 23           \
  -r 30             \
  -acodec aac       \
  -ar 44100         \
  -ac 2             \
  -b:a 128k video_avi.avi
# - s: 缩放视频新尺寸 (size)
# - pix_fmt：pixel format, 设置视频颜色空间
# - vcodec: Video Coder Decoder, 视频编码解码器
# - preset: 编码器预设
# - profile:v: 编码器配置, 与压缩比有关. 实时通讯-baseline, 流媒体-main, 超清视频-high
# - level:v: 对编码器设置的具体规范和限制, 权衡压缩比和画质
# - crf: 设置码率控制模式, constant rate factor恒定速率因子模式, 范围 0~51, 数值越小, 画质越高
# - r:设置视频帧率
# - b:a: 音频比特率, 大多数网站限制音频比特率 128k, 129k
```

#### FFmpeg Cutting

```bash
# audio only
ffmpeg -i cut.mp4 -vn output.mp3
ffmpeg -i video.mp4 -vn -acodec copy video_novideo.m4a

# video only
ffmpeg -i video.mp4 -vcodec copy -an video_silent.mp4
```

```bash
# from to cutting
ffmpeg -i music.mp3 -ss 00:00:30 -to 00:02:00 -acodec copy music_cutout.mp3
ffmpeg -i in.mp4 -ss 00:01:00 -to 00:01:10 -c copy out.mp4
ffmpeg -ss 00:01:00 -i in.mp4 -to 00:01:10 -c copy -copyts out.mp4

# 30s duration cutting
ffmpeg -ss 00:02:00.0 -i input.mkv -t 30 -c copy output.mkv
ffmpeg -i input.mkv -ss 00:02:00.0 -t 30 -c copy output.mkv
ffmpeg -ss 00:01:30.0 -i input.mkv -ss 00:00:30.0 -t 30 output.mkv
```

#### FFmpeg Muxing

```bash
# replace audio
ffmpeg -i input.mkv -i input.mp3 -map 0:v -map 1:a -c copy -shortest output.mp4

# merge audio and video
ffmpeg -i video_novideo.m4a -i video_silent.mp4 -c copy video_merge.mp4

ffmpeg -i "concat:01.mp4|02.mp4|03.mp4" -c copy out.mp4

ffmpeg -i input.mkv -i output.aac \
  -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map 0:v -map "[a]" \
  -c:v copy -c:a aac -ac 2 -shortest output.mp4
```

#### FFmpeg Screenshot

```bash
# -vf -> -filter:v
ffmpeg -ss 00:30:14.435 -i input.mkv -vframes 1 out.png
ffmpeg -i input.mkv -vf fps=1/60 -strftime 1 out_%Y%m%d%H%M%S.jpg
```

#### FFmpeg Gif

```bash
ffmpeg -i video.mp4 -ss 7.5 -to 8.5 -s 640x320 -r 15 video_gif.gif

palette="/tmp/palette.png"
filters="fps=10,scale=-1:144:flags=lanczos"
ffmpeg -ss 30 -t 5 -i input.mp4 -vf "$filters,palettegen" -y $palette
ffmpeg -ss 30 -t 5 -i input.mp4 -i $palette \
  -filter_complex "$filters [x]; [x][1:v] paletteuse" -y output.gif
```

#### FFmpeg Subtitle

```bash
ffmpeg -i input.mkv -vf subtitles=input.srt output.mp4
ffmpeg -i input.mkv -vf ass=input.ass output.mp4
```

#### FFmpeg Watermark

```bash
ffmpeg -i input.mkv -i input.png \
  -filter_complex "overlay=W-w-5:5" -c copy -c:v libx264 output.mkv
```

#### FFmpeg Desktop Recording

```bash
# windows
ffmpeg -f gdigrab -i desktop rec.mp4

# linux
sudo ffmpeg -f fbdev -framerate 10 -i /dev/fb0 rec.mp4
```

#### FFmpeg Live Streaming

```bash
ffmpeg -re i rec.mp4 按照网站要求编码 -f flv "你的rtmp地址/你的直播码"
```

### Nginx

- `/etc/nginx/sites-available`: sites config

```bash
nginx -t # check config syntax
```

#### Nginx Basic Configuration

泛域名路径分离: `xxx.test.dev` -> `/usr/local/html/xxx`

```bash
server {
  listen 80;
  server_name ~^([\w-]+)\.test\.dev$;
  root /usr/local/html/$1;
}
```

```bash
server {
  # SSL configuration
  #
  # listen 443 ssl default_server;
  # listen [::]:443 ssl default_server;
  #
  root /var/www/html/;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

  server_name example.tld www.example.tld;

  # Cache static assets
  location ~* \.(?:jpg|jpeg|gif|png|ico|svg)$ {
    expires 7d;
    add_header Cache-Control "public";
  }

  location ^~ /assets/ {
    gzip_static on;
    expires 12h;
    add_header Cache-Control "public";
  }

  # Cache css and js bundle
  location ~* \.(?:css|js)$ {
    add_header Cache-Control "no-cache, public, must-revalidate, proxy-revalidate";
  }

  location / {
    include /etc/nginx/mime.types;
    try_files $uri $uri/ /index.html;
    # try_files $uri $uri/ =404;

    # proxy_http_version 1.1;
    # proxy_cache_bypass $http_upgrade;
    # proxy_set_header Upgrade $http_upgrade;
    # proxy_set_header Connection 'upgrade';
    # proxy_set_header Host $host;
    # proxy_set_header X-Real-IP $remote_addr;
    # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # proxy_set_header X-Forwarded-Proto $scheme;
    # proxy_pass http://localhost:3000;
  }
}
```

### Docker

#### Docker Installation

```bash
 sudo apt-get update
 sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg \
  lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo DRY_RUN=1 sh get-docker.sh
```

```bash
sudo systemctl status docker
sudo usermod -aG docker $USER
```

#### Docker  Uninstallation

```bash
docker container stop $(docker container ls -aq)
docker system prune -a --volumes
sudo apt purge docker-ce docker-ce-cli containerd.io
sudo apt autoremove
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

#### Docker Basic Usage

##### Build Docker Image

```bash
docker build . -t image-name

# use Dockerfile at the root of the repository
docker build <github-repo-url> -t image-name
```

##### Run Docker Image

```bash
# docker run -dp <host-port>:<container-port> [docker-image]
docker run -d -p 80:80 --name app-name docker/getting-started
docker run -d -p 80:80/tcp -p 80:80/udp --name app-name docker/getting-started
```
