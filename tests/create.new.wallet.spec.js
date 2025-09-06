const { expect } = require('chai')
import {homeScreen} from '../screenObjects/HomeScreen'
import { createWalletScreen  } from '../screenObjects/CreateWalletScreen'
import { walletSettingsScreen } from '../screenObjects/WalletSettingScreen'


describe.only('Create a new wallet', () => {
    const pinCode ='111111'
    const walletName = 'Main Wallet 1'
    it('Create new wallet and confirm seed phrase', async () => {
        // Step 1: Welcome
        await createWalletScreen.verifyWelcomeText()

        // Step 2: Created a new wallet
        await createWalletScreen.createWallet(pinCode)

        // Step 4: Wallet is created
        await homeScreen.isMainWalletDisplayed(walletName)

         // Step 5: Check
        await homeScreen.isMainWalletDisplayed(walletName)
        await homeScreen.clickOnMainWallet()

        // Step 6: Backup flow
        await homeScreen.selectWallet()
        await walletSettingsScreen.verifyManualBackup()

        // Step 7: Secret phrase
        await walletSettingsScreen.verifyOpenedSecretPhrasePage()
        const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
        await walletSettingsScreen.clickOnContinueButton()
        await walletSettingsScreen.confirmSeedPhrase(seedPhrase)
        await walletSettingsScreen.clickOnContinueConfirmButton()

        // Step 8: Verify wallet is active
        await walletSettingsScreen.verifyWalletBackupCompleted()
    })
})
