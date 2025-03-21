import { ENV_VARS } from '@/constants/env.generated';
import { idlFactory, _SERVICE } from './backend.did';
import { Identity, ActorSubclass } from '@dfinity/agent';
import { LOCAL_IP_ADDRESS } from '../constants';
import { CanisterManager } from 'canister-manager';

export const createBackend = (
  identity: Identity | undefined,
): ActorSubclass<_SERVICE> => {
  const canisterManager = new CanisterManager({
    dfxNetwork: ENV_VARS.DFX_NETWORK,
    localIPAddress: LOCAL_IP_ADDRESS,
  });
  return canisterManager.createActor<_SERVICE>({
    canisterId: ENV_VARS.CANISTER_ID_BACKEND,
    interfaceFactory: idlFactory,
    identity,
  });
};
