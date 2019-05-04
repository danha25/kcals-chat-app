import * as EVENT from 'kcals-common/lib/Events'
import Message from 'kcals-common/lib/Message';

export default class Emmiters{

    private socket: any;

    constructor(socket: any) {
        this.socket = socket;
    }

    public newChannelMessage(userId: string, channelId: string, content: string): void{
        const message: Message =  {
            id: 'id'+content,
            userId: userId,
            toUserId: '',
            toChannelId: channelId,
            toNamespaceId: '1',
            content: content
        }
        this.socket.emit(EVENT.EVENT_CHANNEL_MESSAGE, message, () => {
            // confirmation?
        });
    }

}