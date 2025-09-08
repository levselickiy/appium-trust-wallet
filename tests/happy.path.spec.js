import { homeScreen } from '../screenObjects/HomeScreen'
import { createWalletScreen  } from '../screenObjects/CreateWalletScreen'
import { walletSettingsScreen } from '../screenObjects/WalletSettingScreen'
const pinCode ='111111'
const walletName = 'Main Wallet 1'

it.only('Happy path - Create new wallet and confirm the seed phrase', async () => {
    await createWalletScreen.verifyWelcomeText()
    await createWalletScreen.createWallet(pinCode)

    await homeScreen.isMainWalletDisplayed(walletName)
    await homeScreen.isMainWalletDisplayed(walletName)
    await homeScreen.clickOnMainWallet()

    await homeScreen.selectWallet()
    await walletSettingsScreen.openManualBackup()

    await walletSettingsScreen.verifyOpenedSecretPhrasePage()
    const seedPhrase = await walletSettingsScreen.saveSeedPhrase()
    await walletSettingsScreen.clickOnContinueButton()

    await walletSettingsScreen.verifyConfirmPhraseTitle()
    await walletSettingsScreen.confirmSeedPhrase(seedPhrase)
    await walletSettingsScreen.clickOnContinueConfirmButton()

    await walletSettingsScreen.verifyWalletBackupCompleted()

    await walletSettingsScreen.verifyWalletBackupCompleted()
})