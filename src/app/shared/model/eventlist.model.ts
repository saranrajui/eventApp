export class EventObj {
    public Id: string; 
    public organizer: string;
    public about: string;
    public company: string;
    public scheduled_at: Date;
    public duration: number;
    public capacity: number;
    public isToggled: boolean;
    public isMe: boolean;

    constructor(data: any = {}) {
        this.Id = data.Id ? data.Id : ``;
        this.organizer = data.organizer ? data.organizer['first'] + ' ' + data.organizer['last'] : 'User';
        this.about = data.about ? data.about : 'Duis anim magna esse cupidatat nisi id consectetur.';
        this.company = data.company ? data.company : ``;
        this.scheduled_at = data.scheduled_at ? (data.scheduled_at) : new Date();
        this.duration = data.duration ? data.duration : 1;
        this.capacity = data.capacity ? data.capacity : 50;
        this.isToggled = data.isToggled ? data.isToggled : false;
        this.isMe = data.isMe ? data.isMe : false;

    }
}
