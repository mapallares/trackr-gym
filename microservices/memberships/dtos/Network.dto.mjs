import DTO from './dto/DTO.mjs'
import Network from '../entities/Network.entity.mjs'

export class NetworkDTO extends DTO {

    constructor(network) {
        super(Network, network, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default NetworkDTO