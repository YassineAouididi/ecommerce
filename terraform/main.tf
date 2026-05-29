provider "aws" {
  region = "us-east-1"
}

# =========================================
# VPC
# =========================================

module "vpc" {

  source  = "terraform-aws-modules/vpc/aws"
  version = "5.19.0"

  name = "ecommerce-vpc"

  cidr = "10.0.0.0/16"

  azs = [
    "us-east-1a",
    "us-east-1b"
  ]

  private_subnets = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]

  public_subnets = [
    "10.0.101.0/24",
    "10.0.102.0/24"
  ]

  enable_nat_gateway = true

  single_nat_gateway = true

  enable_dns_hostnames = true

  tags = {
    Project = "ecommerce-devops"
  }
}

# =========================================
# AMAZON LINUX 2023 AMI
# =========================================

data "aws_ami" "amazon_linux" {

  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

# =========================================
# SECURITY GROUP
# =========================================

resource "aws_security_group" "web_sg" {

  name = "web-sg"

  description = "Security group for ecommerce app"

  vpc_id = module.vpc.vpc_id

  # SSH
  ingress {
    description = "SSH"

    from_port = 22
    to_port   = 22

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    description = "HTTP"

    from_port = 80
    to_port   = 80

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS"

    from_port = 443
    to_port   = 443

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend API (optional)
  ingress {
    description = "Backend API"

    from_port = 3000
    to_port   = 3000

    protocol = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  # OUTBOUND
  egress {

    from_port = 0
    to_port   = 0

    protocol = "-1"

    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ecommerce-security-group"
  }
}

# =========================================
# EC2 INSTANCE
# =========================================

resource "aws_instance" "app_server" {

  ami = data.aws_ami.amazon_linux.id

  instance_type = "t2.micro"

  subnet_id = module.vpc.public_subnets[0]

  vpc_security_group_ids = [
    aws_security_group.web_sg.id
  ]

  associate_public_ip_address = true

  key_name = "vockey"

  tags = {
    Name = "ecommerce-server"
  }
}

# =========================================
# OUTPUTS
# =========================================

output "instance_public_ip" {
  value = aws_instance.app_server.public_ip
}

output "instance_public_dns" {
  value = aws_instance.app_server.public_dns
}
