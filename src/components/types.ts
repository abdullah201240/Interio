// src/types.ts
export interface DropdownItem {
    label: string;
    to?: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }
  
  export interface NavLink {
    label?: string;
    to?: string;
    href?: string;
    isDropdown?: boolean;
    dropdownItems?: DropdownItem[];
    icon?: React.ReactNode;
  }
  