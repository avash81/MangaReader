<?php
/**
 * MangaVerse Rights Verification Engine
 * Strictly enforces that no chapter is published without commercial redistribution permissions.
 */

class RightsVerifier {
    /**
     * Evaluate whether a rights record grants commercial redistribution rights.
     */
    public static function evaluateRights(array $rightsRecord): array {
        $license = strtoupper(trim($rightsRecord['license_code'] ?? ''));
        $commercialAllowed = false;
        $redistributionAllowed = false;
        $status = 'pending';
        $reason = '';

        // Known Safe Open Licenses
        if (in_array($license, ['CC0', 'PUBLIC DOMAIN', 'PD', 'PUBLIC_DOMAIN'])) {
            $commercialAllowed = true;
            $redistributionAllowed = true;
            $status = 'verified';
            $reason = 'Public Domain / CC0 grants unconditional redistribution and commercial use.';
        } elseif (in_array($license, ['CC BY', 'CC BY 4.0', 'CC BY 3.0', 'CC BY 2.0'])) {
            $commercialAllowed = true;
            $redistributionAllowed = true;
            $status = 'verified';
            $reason = 'CC BY permits commercial redistribution with mandatory creator attribution.';
        } elseif (in_array($license, ['CC BY-SA', 'CC BY-SA 4.0', 'CC BY-SA 3.0'])) {
            $commercialAllowed = true;
            $redistributionAllowed = true;
            $status = 'verified';
            $reason = 'CC BY-SA permits commercial redistribution under ShareAlike requirements.';
        } elseif (in_array($license, ['CC BY-ND', 'CC BY-ND 4.0'])) {
            $commercialAllowed = true;
            $redistributionAllowed = true;
            $status = 'verified';
            $reason = 'CC BY-ND permits commercial redistribution if works are served strictly unmodified.';
        } elseif (strpos($license, 'NC') !== false) {
            // NonCommercial restrictions: REJECT for ad-monetized MangaVerse
            $commercialAllowed = false;
            $redistributionAllowed = false;
            $status = 'rejected';
            $reason = "License {$license} contains NonCommercial (NC) restriction. Ad-supported platforms constitute commercial use.";
        } elseif (!empty($rightsRecord['commercial_use']) && !empty($rightsRecord['redistribution_allowed'])) {
            // Explicit Creator Studio agreement or Direct Publisher contract
            $commercialAllowed = (bool)$rightsRecord['commercial_use'];
            $redistributionAllowed = (bool)$rightsRecord['redistribution_allowed'];
            $status = 'verified';
            $reason = 'Explicit bilateral hosting & commercial redistribution agreement on file.';
        } else {
            $status = 'pending';
            $reason = "Unrecognized or unverified rights status for license: {$license}. Sent to manual review queue.";
        }

        // Check expiration
        if (!empty($rightsRecord['valid_until'])) {
            $expiry = strtotime($rightsRecord['valid_until']);
            if ($expiry && $expiry < time()) {
                $status = 'expired';
                $reason = "License agreement expired on {$rightsRecord['valid_until']}.";
            }
        }

        return [
            'status' => $status,
            'commercial_use' => $commercialAllowed,
            'redistribution_allowed' => $redistributionAllowed,
            'reason' => $reason
        ];
    }

    /**
     * The Master Publishing Gate: All checks must pass before a chapter is visible to users.
     */
    public static function canAutoPublish(array $manga, array $chapter, array $rights, array $quality): bool {
        // 1. Legal permissions gate
        if (($rights['status'] ?? '') !== 'verified') return false;
        if (empty($rights['commercial_use'])) return false;
        if (empty($rights['redistribution_allowed'])) return false;

        // 2. Expiry gate
        if (!empty($rights['valid_until']) && strtotime($rights['valid_until']) < time()) return false;

        // 3. Technical & Page sequence quality gate
        if (empty($quality['all_files_valid'])) return false;
        if (empty($quality['page_sequence_valid'])) return false;
        if (($quality['page_count'] ?? 0) < 1) return false;
        if (empty($quality['duplicate_check_passed'])) return false;

        return true;
    }
}
