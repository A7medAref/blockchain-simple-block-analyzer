variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-north-1"
}

variable "project_name" {
  description = "Name of the project (for resource naming)"
  type        = string
  default     = "simple-app"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ssh_public_keys" {
  description = "SSH public keys"
  type        = list(string)
}
