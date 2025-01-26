import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserType } from '../../interface/auth';

@Component({
  selector: 'app-dash-users',
  standalone: false,

  templateUrl: './dash-users.component.html',
  styleUrl: './dash-users.component.css',
})
export class DashUsersComponent {
  users: User[] = [];
  userTypes: UserType[] = [];
  userList: any[] = [];

  usersForm!: FormGroup;
  isModelOpen = false;
  editingUser = false;
  userToDelete: string | null = null;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showSnackBar = false;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.formValidators();
    this.getAllUserTypes();
    this.getUsers();
  }

  formValidators() {
    this.usersForm = this.fb.group({
      name: ['', Validators.required],
      _id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // role: ['', Validators.required],
      userType: ['', Validators.required],
      
    });
  }

  openModel() {
    this.isModelOpen = true;
    // console.log('open model');
  }

  closeModel() {
    this.isModelOpen = false;
    this.usersForm.reset();
    this.editingUser = false;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        // console.log("this",data);
        this.users = data;
        this.getUsers();
      },
      (err) => {
        this.showAlert('error Fetching Users', 'error');
      }
    );
  }

  getAllUserTypes() {
    this.userService.getUserTypes().subscribe(
      (data) => {
        // console.log("User types from server:", data); // تحقق من البيانات القادمة
        this.userTypes = data;
        this.getUsers();
      },
      (err) => {
        this.showAlert('error User Types', 'error');
      }
    );
  }

  editUser(user: any) {
    this.editingUser = true;
    this.usersForm.patchValue({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      // role: user.role,
      userType: user.userType ,
    });
    // console.log('User Type in Form:', user.userType); // تحقق من القيمة هنا

    this.openModel();
  }

  saveUser() {
    const updatedUser = this.usersForm.value;
    // console.log('Form Data:', updatedUser); // تحقق من القيم هنا
    if (!updatedUser.userType) {
      this.showAlert('User type ID is missing.', 'error');
      this.closeModel()
      return;
    }
    
    if (this.editingUser) {
      let result= this.userService.updateUser(updatedUser._id, updatedUser).subscribe(
        (res) => {
          // console.log('User updated successfully:', res);
          this.getAllUsers();
          this.getUsers(); // تحديث userList
          this.closeModel();
          this.showAlert('User Updated successfully!', 'success');
        },
        (err) => {
          // console.log('error updating user', err);
          this.showAlert('Error Updating User.', 'error');
        }
      );
    }
  }
  confirmDeleteUser(id: string) {
    this.userToDelete = id;
  }

  deleteUser() {
    if (!this.userToDelete) return;
    this.userService.deleteUser(this.userToDelete).subscribe(
      (res) => {
        this.getAllUsers();
        this.showAlert('User deleted successfully!', 'success');
        this.userToDelete = null;
      },
      (err) => {
        // console.log('error deleting user', err);
        this.showAlert('Error deleting User.', 'error');
        this.userToDelete = null;
      }
    );
  }

  addOrUpdateUser() {
    if (this.editingUser) {
      this.saveUser();
    }
  }
  getUsers() {
    this.userList = this.users.map((user) => {
      const userType = this.userTypes.find((type) => {
        return type._id === user.userType;
      });
      return { ...user, type: userType };
    });
    // console.log('User List:', this.userList); // تحقق من القيم هنا

  }

  onConfirmDelete(result: boolean): void {
    if (result) {
      this.deleteUser();
    }
    this.userToDelete = null;
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showSnackBar = true;
    setTimeout(() => {
      this.showSnackBar = false;
    }, 3000);
  }
}
