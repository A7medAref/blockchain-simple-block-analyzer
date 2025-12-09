provider "aws" {
  region = var.aws_region
}

# Data source for latest Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Security Group
resource "aws_security_group" "ec2" {
  name        = "${var.project_name}-sg"
  description = "Allow SSH and port 3000 inbound, all outbound"

  # Allow SSH from anywhere (you can restrict this to your IP)
  ingress {
    description = "SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow port 3000 from anywhere
  ingress {
    description = "Application port 3000"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}

# EC2 Instance
resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  
  vpc_security_group_ids = [aws_security_group.ec2.id]

  # Associate public IP
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    %{ for key in var.ssh_public_keys ~}
    echo "${key}" >> /home/ubuntu/.ssh/authorized_keys
    %{ endfor ~}
  EOF

  tags = {
    Name = "${var.project_name}-instance"
  }
}
