import { makeAutoObservable } from 'mobx';
import { IRoom } from '../model/room.model';

class Room {
  myRooms: Array<IRoom> = [];
  isFetching: boolean = false;
  isError: boolean = false;
  isAddingNewRoom: boolean = false;
  isDeleting: boolean = false;
  isAddingUsers: boolean = false;
  isUsersSidebarHidden: boolean = true;
  activeRoom: IRoom | undefined = undefined;
  isRoomSidebarHidden: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  showOrHideRoomSidebar = () => {
    this.isRoomSidebarHidden = !this.isRoomSidebarHidden;
  };

  hideRoomSidebar = () => {
    this.isRoomSidebarHidden = true;
  };

  showRoomSidebar = () => {
    this.isRoomSidebarHidden = false;
  };

  roomsFetchingInProgress() {
    this.isFetching = true;
  }

  roomsFetchingSuccess = (rooms: IRoom[]) => {
    this.isFetching = false;
    this.myRooms = rooms;
  };

  addingNewRoomInProgress = () => {
    this.isAddingNewRoom = true;
  };

  deletingInProgress = () => {
    this.isDeleting = true;
  };

  addingUsersInProgress = () => {
    this.isAddingUsers = true;
  };

  addingUsersSuccess = () => {
    this.isAddingUsers = false;
    this.hideUsersSidebar();
  };

  hideUsersSidebar = () => {
    this.isUsersSidebarHidden = true;
  };

  showUsersSidebar = () => {
    this.isUsersSidebarHidden = false;
  };

  savingNewRoomOptimistic = () => {
    this.myRooms = [
      { id: -1, title: '', last_message: '', last_message_time: new Date() },
      ...this.myRooms,
    ];
  };

  addingNewRoomSuccess = (savedRoom: IRoom) => {
    const buf = this.myRooms.map((room) => (room.id < 0 ? savedRoom : room));
    this.myRooms = buf;
    this.isAddingNewRoom = false;
  };

  addingNewRoomCancel = () => {
    this.isAddingNewRoom = false;
  };

  deletingCancel = () => {
    this.isDeleting = false;
  };

  addingNewRoomError = () => {
    this.isAddingNewRoom = false;
    this.isError = true;
  };

  setActiveRoom = (room: IRoom) => {
    this.activeRoom = room;
  };

  deleteOpimistic = (deletedRoomId: number) => {
    this.myRooms = this.myRooms.map((room) =>
      room.id === deletedRoomId ? Object.assign(room, { id: -1 }) : room,
    );
  };
}

const roomStore = new Room();

export default roomStore;
