import {
    recoverTypedSignatureLegacy
} from 'eth-sig-util'
import { toChecksumAddress } from 'ethereumjs-util';

export async function verifySignature(account, signature) {
    const dateObj = new Date()
    const month = dateObj.getUTCMonth() + 1 //months from 1-12
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()

    const today = day + "/" + month + "/" + year

    var success = false 

    const msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: 'Log in',
      },
      {
        type: 'string',
        name: 'Date',
        value: today,
      },
    ]
    try {
      const from = account
      const recoveredAddr = await recoverTypedSignatureLegacy({
        data: msgParams,
        sig: signature,
      })
      if (toChecksumAddress(recoveredAddr) === toChecksumAddress(from)) {
        console.log(`Successfully verified signer as ${recoveredAddr}`);
        success = true
      } else {
        console.log(
          `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
        )
        success = false
      }
    } catch (err) {
      console.error(err)
      success = false
    }
    return success
  };