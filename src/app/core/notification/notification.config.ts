import { GlobalConfig } from 'ngx-toastr';

export interface NotificationConfig {
  maxLength?: number;
  toastr?: Partial<GlobalConfig>;
}

export const notificationConfig: NotificationConfig = {
  maxLength: 100,
  toastr: {
    preventDuplicates: true
  }
};
