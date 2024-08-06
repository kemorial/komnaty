import { makeAutoObservable } from 'mobx';
import { IUser } from '../model/user.model';

class User {
  user: IUser | undefined;
  isLoggedIn: boolean | undefined;
  isFetching: boolean | undefined;
  isError: boolean | undefined;
  error: string | undefined;

  users: IUser[] = [];
  isUsersFetching: boolean | undefined = false;
  selectedUsers: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  registrationSuccessful() {
    this.isError = false;
    this.error = undefined;
    this.isFetching = false;
  }

  registrationInProgress() {
    this.isFetching = true;
    this.isError = false;
    this.error = undefined;
  }

  registrationError(error: string) {
    this.isError = true;
    this.isFetching = false;
    this.error = error;
  }

  loginSuccessful(user: IUser) {
    this.user = user;
    this.isLoggedIn = true;
    this.isError = false;
    this.error = undefined;
    this.isFetching = false;
  }

  loginInProgress() {
    this.isFetching = true;
    this.isError = false;
    this.error = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginError(error: string) {
    this.user = undefined;
    this.isError = true;
    this.error = error;
    this.isFetching = false;
  }

  fetchingUsers = () => {
    this.isUsersFetching = false;
  };

  usersFetchedSuccessfuly = (users: IUser[]) => {
    this.users = users;
  };

  select = (userId: number) => {
    if (!this.isSelected(userId)) return this.selectedUsers.push(userId);
    this.selectedUsers = this.selectedUsers.filter((id) => id !== userId);
  };

  isSelected = (userId: number) => {
    return this.selectedUsers.find((id) => id === userId);
  };

  clearSelected = () => {
    this.selectedUsers = [];
  };
}

const userStore = new User();

export default userStore;
