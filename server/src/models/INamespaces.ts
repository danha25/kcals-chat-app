'use strict'
import Namespace from 'kcals-common/lib/Namespace';

export default interface INamespace {
    createNamespace(name: string): Namespace;
    getNamespace(name: string): Namespace;
}