DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Public Read Objects' AND tablename = 'objects'
    ) THEN
        CREATE POLICY "Public Read Objects" ON storage.objects FOR SELECT USING (bucket_id = 'apparel-images');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Public Upload Objects' AND tablename = 'objects'
    ) THEN
        CREATE POLICY "Public Upload Objects" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'apparel-images');
    END IF;
END $$;
