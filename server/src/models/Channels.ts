import Channel from 'kcals-common/lib/Channel';
import IChannels from './IChannels';

export default class Channels implements IChannels {

    private channels: Array<Channel>;

    constructor() {
        this.channels = new Array<Channel>();

        this.channels.push({
            id: '1',
            namespaceId: '1',
            name: 'channel1',
        });

        this.channels.push({
            id: '2',
            namespaceId: '1',
            name: 'channel2'
        });
    }

    public createChannel(name: string, namespaceId: string): Channel {
        const channel: Channel = {
            id: 'id' + name,
            namespaceId: namespaceId,
            name: name
        }

        this.channels.push(channel);
        return channel;
    } 
    
    public getChannels(namespaceId: string): Array<Channel> {
        return this.channels.filter((channel) => channel.namespaceId === namespaceId);
    }

}