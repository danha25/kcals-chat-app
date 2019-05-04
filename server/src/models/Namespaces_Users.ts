import INamespaces_Users from './INamespaces_Users';
import Namespace_User from 'kcals-common/lib/Namespace_User';

export default class NamespacesUsers implements INamespaces_Users{

    private namespaceUsers: Array<Namespace_User>;

    constructor() {
        this.namespaceUsers = new Array<Namespace_User>();

        this.namespaceUsers.push({
            namespaceId: '1',
            userId: '1'
        });

        this.namespaceUsers.push({
            namespaceId: '1',
            userId: '2'
        });

        this.namespaceUsers.push({
            namespaceId: '1',
            userId: '3'
        });
    }

    public getUsersIds(namespaceId: string): Array<string> {
        const namespacesUsers =  this.namespaceUsers.filter((namespaceUser) => namespaceUser.namespaceId === namespaceId);
        return namespacesUsers.map((nu) => nu.userId);
    }

}