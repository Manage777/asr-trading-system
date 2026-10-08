# ASR Trading System — Private Beta Tester Guide (Draft)

**Status:** Preparation only. Do not distribute until the compiled NinjaTrader 8 add-on is tested and vendor licensing is confirmed.

## Included in the planned beta
- ASRPriceBars (V16 baseline, pending final chart validation)
- ASR indicators, including ASRVolatilityV3
- ASRAutoTrader: Auto A (reversal and pullback), Auto B (momentum and trend continuation), Auto C (inside-out/second-bar continuation)
- Manual execution and configurable stop, target, trail and close-all controls

## Before the tester receives software
1. Compile and validate all NinjaScript components in NinjaTrader Desktop 8.
2. Run playback checks for bar construction, entries, stops, targets, order cancellation, emergency Close All and mode switching.
3. Integrate NinjaTrader vendor licensing using ASR Product ID 2612 and verify activation on a separate account. Verify whether the licensing system can enforce one authorized laptop per license; do not claim device locking until confirmed. If unsupported, evaluate a compatible additional device-binding mechanism and test transfers/reinstallation.
4. Create a time-limited tester license only after the build is ready.
5. Export a compiled, protected, vendor-licensed customer ZIP, not source code.
6. Test a clean installation, uninstall, license expiry and attempted activation on a second laptop. Document the device-transfer and reactivation process.
7. Confirm the beta agreement, support channel and risk disclosures.

## Playback results to record
Date, instrument, session (exchange/local timezone), NinjaTrader version, ASR build, bar size, Auto mode, entry/exit settings, number of trades, net P&L, commissions/slippage assumptions, maximum drawdown, screenshots and any order errors.

## Tester safety
Use **Playback or Sim101 only**. Do not connect the beta to live trading accounts. Results are hypothetical/simulated and do not predict future performance. No profits are guaranteed.

## Reporting
Send screenshots, NinjaTrader log/trace excerpts (with private information removed), and reproducible steps to support@asrtradingsystem.com.

## Website release policy
The main branch and live website remain unchanged until the software is ready for the private beta. This draft is for internal review.

## One-laptop licensing decision (pending vendor confirmation)
NinjaTrader's legacy machine-ID vendor licensing documents explicitly state PC machine-ID binding. The current user-based VendorLicense(productID) documentation confirms account-based entitlement checks but does not document strict single-device enforcement. ASR Product ID 2612 currently uses user-based licensing. Do not claim or sell one-laptop enforcement until tested.

Questions for Vendor Support:
- Can user-based licenses enforce exactly one active machine per customer?
- Can ASR use legacy machine-ID licensing or a supported additional device check alongside VendorLicense(2612)?
- How should a customer request a machine transfer?
- How can we verify invalid-license behavior and second-device rejection?

References:
- https://docs.ninjatrader.com/ninjascript/user_based_licensing_quick_start_guide
- https://ninjatrader.com/support/helpGuides/nt8/licensing_user_authentication.htm
