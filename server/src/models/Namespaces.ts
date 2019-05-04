import Namespace from 'kcals-common/lib/Namespace';
import INamespaces from './INamespaces';

export default class Namespaces implements INamespaces {

    private namespaces: Array<Namespace>;

    constructor() {
        this.namespaces = new Array<Namespace>();

        this.namespaces.push({
            id: '1',
            name: 'namespace1'
        });
    }

    public createNamespace(newName: string): Namespace {
        const newNamespace: Namespace = {
            id: 'id' + newName,
            name: newName
        };
        this.namespaces.push(newNamespace);
        return newNamespace;
    }

    public getNamespace(name: string): Namespace {
        return this.namespaces.filter((namespace) => namespace.name === name)[0];
    }
}