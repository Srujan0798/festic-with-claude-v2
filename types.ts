// Fix: Created types.ts file with required type definitions.
export enum Role {
  Host = 'University Host',
  Vendor = 'Vendor',
  Student = 'Student',
}

export enum ApplicationStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum TeamType {
  Media = 'Media Team',
  VendorManagement = 'Vendor Management',
  Logistics = 'Logistics',
  Security = 'Security',
  Hospitality = 'Hospitality',
  Technical = 'Technical'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  // Fix: Add optional 'avatarUrl' property to User type.
  avatarUrl?: string;
}

export interface TeamPermissions {
  canUploadMedia: boolean;
  canManageVendors: boolean;
  canAccessSecurity: boolean;
  canManageLogistics: boolean;
  canManageHospitality: boolean;
  canManageTechnical: boolean;
}

export interface TeamMember extends User {
  teamType: TeamType;
  assignedEventId: string;
  permissions: TeamPermissions;
}

export interface Vendor {
  id: string;
  businessName: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  university: string;
  hostId: string;
  description: string;
  expectedFootfall: number;
  imageUrl: string;
  tags: string[];
  communityTag: string;
  visibility: 'public' | 'private';
}

export interface Community {
    id: string;
    name: string;
    imageUrl: string;
    tag: string;
}

export interface Application {
  id: string;
  vendorId: string;
  eventId: string;
  status: ApplicationStatus;
}