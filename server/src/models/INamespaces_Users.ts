'use strict'

// tslint:disable-next-line: class-name
export default interface INamespaces_Users{
   getUsersIds(namespaceId: string): Array<string>;
}