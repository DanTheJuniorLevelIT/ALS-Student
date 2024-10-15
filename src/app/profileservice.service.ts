import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {

  private profilePicSource = new BehaviorSubject<string>('assets/icon.jpg'); //Default Picture
  currentProfilePic = this.profilePicSource.asObservable();

  updateProfilePic(newPicUrl: string): void {
    this.profilePicSource.next(newPicUrl);
  }

  // Reset profile picture to default icon when logging out
  resetProfilePic() {
    this.profilePicSource.next('assets/icon.jpg');
  }

  constructor() { }
}
