# Simple EC2 Terraform Configuration

A Terraform configuration to deploy a single EC2 instance with SSH and port 3000 access.

## Features

- Single EC2 instance (Ubuntu)
- Security group allowing:
  - SSH (port 22) from anywhere
  - Port 3000 from anywhere
  - All outbound traffic
- Public IP address assigned

## Prerequisites

1. AWS CLI configured with credentials
2. Terraform installed (>= 1.0)
3. An AWS Key Pair created in your region

## Usage

### 1. Create terraform.tfvars

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set your values:

```hcl
aws_region    = "us-east-1"
project_name  = "my-app"
instance_type = "t3.micro"
ssh_public_keys = ["ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGiTIl9F5k1af4aywazNBdLkhYdp4Xb8dvz20w+xYL0D", "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKZ+PmRuvKNyLwho88iXmIFbMx7HYMBnLvcz2kHB26sP aboelaref.ahmed@gmail.com"]

```

### 2. Initialize Terraform

```bash
terraform init
```

### 3. Plan the deployment

```bash
terraform plan
```

### 4. Apply the configuration

```bash
terraform apply
```

### 5. Get outputs

After successful deployment, you'll see:

- Instance ID
- Public IP address
- Application URL (http://PUBLIC_IP:3000)

### 6. Connect to your instance

```bash
ssh -i /path/to/your-key.pem ec2-user@<PUBLIC_IP>
```

## Clean Up

To destroy all resources:

```bash
terraform destroy
```
