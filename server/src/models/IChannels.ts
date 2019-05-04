'use strict'
import Channel from 'kcals-common/lib/Channel';

export default interface IChannels{
    createChannel(name: string, namespaceId: string): Channel;
    getChannels(namespaceId: string): Array<Channel>;
}